import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { getAllCategory } from './CategoryController';

const path = '/category';
const router = Router();

router.get('/all', jwtFilter, controllerHandler(getAllCategory));


export default { path, router };
