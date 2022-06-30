import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {User} from '../interfaces/Db';
import {Formidable} from 'formidable';
import {responseSuccess, responseErrorValidation, responseError} from '../utils';
import {uploadFile} from '../config/cloudinary';
import {hashPassword, verifyPassword} from '../utils/password';
import {signUser} from '../utils/jwt';
import {RequestUser} from '../interfaces';
import {emitSocketEvent} from '../config/socket';
import {UserModel, UserDetail, UserWallet, UserSettings} from '../db/models';
import lnurlServer from '../config/lnurl';

// Controller for registering user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const username: string = req.body.username;
        const pass: string = req.body.password;

        // Check if username already exists in the database, throw an error if it does
        const users: User[] = await UserModel.find({username});

        if (users.length > 0) {
            return responseError(res, 400, 'User already exists');
        }

        const password: string = hashPassword(pass);

        const userCreated = await UserModel.create({
            username,
            password
        });

        if (userCreated._id) {
            // Create user balance of default 0
            const userId = userCreated._id;

            await UserDetail.create({user: userId});
            await UserWallet.create({user: userId});
        }

        responseSuccess(res, 200, 'Successfully created user', {});
    } catch (err) {
        next(err);
    }
};

// Controller for user login
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const username: string = req.body.username;
        const pass: string = req.body.password;

        const users: User[] = await UserModel.find({username});

        if (users.length > 0) {
            let user = users[0];


            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Incorrect password');
            }

            const token = signUser(user);

            const data = {
                username: user.username,
                pubkey: user.pubkey,
                token
            }

            return responseSuccess(res, 200, 'Successfully login', data);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};

// Controller for user details
export const userDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const userId = reqUser.user._id;

        const bio: string = req.body.bio;
        const url: string = req.body.url;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;

        const users: User[] = await UserModel.find({_id: userId});

        if (users.length > 0) {
            await UserDetail.updateOne({user: userId}, {bio, url, firstName, lastName});
            const userData = await UserDetail.findOne({user: userId});

            return responseSuccess(res, 200, 'Successfully updated user details', userData);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};

// Controller for user and details
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const userId: string = req.params.userId;

        const users: User[] = await UserModel.find({_id: userId});

        if (users.length > 0) {
            const user: User[] = await UserDetail.find({user: userId}).populate('user', ['username']);

            return responseSuccess(res, 200, 'Successfully got user', user);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};

// Controller for user details
export const getDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const userId = reqUser.user._id;

        const details = await UserDetail.findOne({user: userId});

        return responseSuccess(res, 200, 'Successfully got user details', details);

    } catch (err) {
        next(err);
    }
};

export const userImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const userId = reqUser.user._id;

        const form = new Formidable();

        form.parse(req, (err, fields, files) => {
            // @ts-ignore
            uploadFile(files.upload.filepath, async (err, url) => {
                if (err) {
                    return responseError(res, 403, err);
                } else {
                    await UserDetail.updateOne({user: userId}, {image: url});
                    return responseSuccess(res, 200, 'Successfully updated user image', url);
                }
            });
        });
    } catch (err) {
        next(err);
    }
};

export const lnurlLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await lnurlServer.generateNewUrl("login");

        res.send(result);
    } catch (err) {
        next(err);
    }
}

export const pseudoLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const query = req.query;

        if (query.key) {
            const key: string = String(query.key);

            // Check if user exists in the database;
            const users: User[] = await UserModel.find({pubkey: key});

            if (users.length === 0) {
                const userCreated = await UserModel.create({pubkey: key});
                const userId = userCreated._id;

                await UserDetail.create({user: userId});
                await UserWallet.create({user: userId});
                await UserSettings.create({user: userId});
            }

            // Get user again for token
            const usersToken: User[] = await UserModel.find({pubkey: key});
            let user = usersToken[0];

            const token = signUser(user);

            emitSocketEvent.emit('auth', {key, token});
            res.json({key});
        } else {
            return responseError(res, 404, 'Unsuccesful LNURL AUTH login');
        }
    } catch (err) {
        next(err);
    }
}