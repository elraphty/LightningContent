import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {responseSuccess, responseErrorValidation, responseError} from '../utils';
import {UserSettings, UserModel} from '../db/models';
import {RequestUser} from '../interfaces';
import {User} from '../interfaces/Db';

export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseErrorValidation(res, 400, errors.array());
    }
    
    const reqUser = req as RequestUser;
    const userId = reqUser.user._id;
    
    const user: User | null = await UserSettings.findOne({user: userId});
    
    responseSuccess(res, 200, 'Successfully retrieve settngs', {user});
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseErrorValidation(res, 400, errors.array());
    }
    
    const reqUser = req as RequestUser;
    const userId = reqUser.user._id;

    const defaultCurrency = req.body.defaultCurrency;
    const satsRatio = req.body.satsRatio;
    
    await UserSettings.updateOne({user: userId}, {defaultCurrency, satsRatio});
    
    const user: User | null = await UserSettings.findOne({user: userId});
    
    responseSuccess(res, 200, 'Successfully updated settngs', {user});
  } catch (err) {
    next(err);
  }
};