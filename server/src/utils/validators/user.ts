import { body, param } from 'express-validator';

const myWhitelist: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_#@.';

export const createUser = [
  body('username')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .isLength({ min: 5 })
    .withMessage('Enter a username with a minimum of five characters '),
  body('password')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .isLength({ min: 6 })
    .withMessage('Password length must be up to six characters'),
]

export const updateUser = [
  body('firstname')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter firstname'),
  body('lastname')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter lastname'),
  body('url')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
    .escape()
    .withMessage('Enter url'),
  body('bio')
    .not().isEmpty()
    .isString()
    .ltrim()
    .rtrim()
    .whitelist(myWhitelist)
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
