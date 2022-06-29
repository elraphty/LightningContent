import express, {Router} from 'express';
import user from './user';
import settings from './settings';

const router: Router = express.Router();

router.use('/user', user);
router.use('/settings', settings);

export default router;