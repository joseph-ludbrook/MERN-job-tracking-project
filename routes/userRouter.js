import { Router } from 'express';
import {
	getApplicationStatus,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import {
	authorizePermissions,
	checkForTest,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/currentuser', getCurrentUser);
router.get('/admin/appstats', [
	authorizePermissions('admin'),
	getApplicationStatus,
]);
router.patch(
	'/updateuser',
	checkForTest,
	upload.single('avatar'),
	validateUpdateUserInput,
	updateUser
);

export default router;
