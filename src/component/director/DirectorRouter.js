import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';

import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createDirector, deleteDirector, getAllDirector, updateDirector } from './DirectorController';

const path = '/director';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createDirector));

router.get('/all', jwtFilter, pagination(1, 10), controllerHandler(getAllDirector));

router.delete('/:id', jwtFilter, controllerHandler(deleteDirector));

router.put('/:id', jwtFilter, controllerHandler(updateDirector));





export default { path, router };
