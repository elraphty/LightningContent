import { Request, Response, NextFunction } from 'express';
import knex from '../db';
import { validationResult } from 'express-validator';
import { User, UserBalance, UserDetails } from '../interfaces/Db';
import { responseSuccess, responseErrorValidation, responseError } from '../utils';
import { hashPassword, verifyPassword } from '../utils/password';
import { signUser } from '../utils/jwt';
import { RequestUser } from '../interfaces';

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
        const user: User[] = await knex<User>('users').where({ username });

        if (user.length > 0) {
            return responseError(res, 400, 'User already exists');
        }

        const password: string = hashPassword(pass);

        const userId = await knex<User>('users').insert({ username, password }).returning('id');

        if (userId.length > 0) {
            // Create user balance of default 0
            const id = userId[0].id;

            await knex<UserBalance>('usersbalance').insert({ userId: id, balance: 0 });
            await knex<UserDetails>('usersdetails').insert({ userId: id });
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

        const users: User[] = await knex<User>('users').where({ username });

        if (users.length > 0) {
            let user = users[0];
            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Incorrect password');
            }

            // Delete user password
            delete user.password;

            const token = signUser(user);

            // Add token to user object
            user.token = token;

            return responseSuccess(res, 200, 'Successfully login', user);
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
        const userId = reqUser.user.id;

        const bio: string = req.body.bio;
        const url: string = req.body.url;
        const firstname: string = req.body.firstname;
        const lastname: string = req.body.lastname;

        const users: User[] = await knex<User>('users').where({ id: userId });

        if (users.length > 0) {
            await knex<UserDetails>('usersdetails').where({ userId }).update({ firstname, lastname, url, bio });

            const user = await knex<UserDetails>('usersdetails').where({ userId }).first();
        
            return responseSuccess(res, 200, 'Successfully updated user details', user);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};

// Controller for user details
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const userId: number = Number(req.params.userId);

        const users: User[] = await knex<User>('users').where({ id: userId });

        if (users.length > 0) {
            const user = users[0];

            const userDetails = await knex<UserDetails>('usersdetails').where({ userId }).first();
            user.details = userDetails;
    
            return responseSuccess(res, 200, 'Successfully got user', user);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};