import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createCharacter, createMovie, delCharacter, getAllMovie, getDetailSingleMovie, getMovieCategories, getSeasonOfMovie, updateCategoryForMovie } from './MovieController';

const path = '/movie';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createMovie));

router.get('/all', jwtFilter, pagination(1, 10), controllerHandler(getAllMovie));

router.get('/seasons', jwtFilter, controllerHandler(getSeasonOfMovie));

router.put('/update-categories', jwtFilter, controllerHandler(updateCategoryForMovie));

router.get('/categories', jwtFilter, controllerHandler(getMovieCategories));

router.delete('/single/character', jwtFilter, controllerHandler(delCharacter));

router.post('/single/new-character', jwtFilter, controllerHandler(createCharacter));

router.get('/single/:id', jwtFilter, controllerHandler(getDetailSingleMovie));

export default { path, router };
