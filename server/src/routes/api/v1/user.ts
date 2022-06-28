import express, {Router} from 'express';
import {registerUser, userLogin, userDetails, getUser, userImage, lnurlLogin, pseudoLogin} from '../../../controllers/user';
import {createUser, user, updateUser} from '../../../utils/validators/user';
import {authUser} from '../../../utils/auth';

const router: Router = express.Router();

router.post('/register', createUser, registerUser);

router.post('/login', createUser, userLogin);

router.put('/details', updateUser, authUser, userDetails);

router.put('/image', authUser, userImage);

router.get('/login-lnurl', lnurlLogin);

router.get('/lnurl', pseudoLogin);

router.get('/:userId', user, getUser);

export default router;