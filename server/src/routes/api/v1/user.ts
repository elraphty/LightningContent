import {Router} from 'express';
import {
  registerUser, 
  userLogin, 
  userDetails, 
  getDetails,
  getUser, 
  userImage, 
  lnurlLogin, 
  pseudoLogin
} from '../../../controllers/user';
import {createUserVal, userVal, updateUserVal} from '../../../utils/validators/user';
import {authUser} from '../../../utils/auth';

const router: Router = Router();

router.post('/register', createUserVal, registerUser);

router.post('/login', createUserVal, userLogin);

router.get('/details', authUser, getDetails);

router.put('/details', updateUserVal, authUser, userDetails);

router.put('/image', authUser, userImage);

router.get('/login-lnurl', lnurlLogin);

router.get('/lnurl', pseudoLogin);

router.get('/:userId', userVal, getUser);

export default router;