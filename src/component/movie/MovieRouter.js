import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createMovie, getAllMovie, getSeasonOfMovie } from './MovieController';

const path = '/movie';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createMovie));

router.get('/all', jwtFilter, pagination(1, 10), controllerHandler(getAllMovie));

router.get('/seasons', jwtFilter, controllerHandler(getSeasonOfMovie));

export default { path, router };
