import {body, param} from 'express-validator';

const myWhitelist: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_#@.';

export const createUser = [
  body('username')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .isLength({min: 5})
    .withMessage('Enter a username with a minimum of five characters '),
  body('password')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .isLength({min: 6})
    .withMessage('Password length must be up to six characters'),
]

export const updateUser = [
  body('firstName')
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter firstname'),
  body('lastName')
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter lastname'),
  body('url')
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter url'),
  body('bio')
    .isString()
    .ltrim()
    .rtrim()
    // .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter bio'),
]

export const user = [
  param('userId')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter a userId ')
]
