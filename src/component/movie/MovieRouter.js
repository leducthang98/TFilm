import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createMovie, getAllMovie, getMovieCategories, getSeasonOfMovie, updateCategoryForMovie } from './MovieController';

const path = '/movie';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createMovie));

router.get('/all', jwtFilter, pagination(1, 10), controllerHandler(getAllMovie));

router.get('/seasons', jwtFilter, controllerHandler(getSeasonOfMovie));

router.put('/update-categories', jwtFilter, controllerHandler(updateCategoryForMovie));

router.get('/categories', jwtFilter, controllerHandler(getMovieCategories));

export default { path, router };
