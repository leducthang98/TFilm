import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { requireAdmin } from '../../middleware/Authorize';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { getAllUsers, getMe, updateMe } from './UserController';

const path = '/user';
const router = Router();

router.get('/me', jwtFilter, controllerHandler(getMe));

router.put('/update/me', jwtFilter, controllerHandler(updateMe));

// router.get('/all', jwtFilter, requireAdmin, controllerHandler(getAllUsers));


export default { path, router };
