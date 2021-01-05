import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';

import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createDirector } from './DirectorController';

const path = '/director';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createDirector));




export default { path, router };
