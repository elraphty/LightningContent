import express, { Router } from 'express';
import { registerUser, userLogin } from '../../../controllers/user';
import { createUser } from '../../../utils/validators/user';
import { authUser } from '../../../utils/auth';

const router: Router = express.Router();

router.post('/register', createUser, registerUser);

router.post('/login', createUser, userLogin);

export default router;