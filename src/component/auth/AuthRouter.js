import { Router } from 'express';

import { controllerHandler } from '../../middleware/ErrorHandler';
import { login, regist } from './AuthController';

const path = '/auth';
const router = Router();

router.post('/login', controllerHandler(login));

router.post('/regist', controllerHandler(regist));

export default { path, router };
