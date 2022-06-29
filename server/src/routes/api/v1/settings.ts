import {Router} from 'express';
import {getSettings, updateSettings} from '../../../controllers/settings';
import {updateVal} from '../../../utils/validators/settings';
import {authUser} from '../../../utils/auth';

const router: Router = Router();

router.get('/', authUser, getSettings);

router.put('/update', authUser, updateVal, updateSettings);

export default router;