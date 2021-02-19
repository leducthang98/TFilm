import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createCharacter, createMovie, delCharacter, editDescription, editDirector, editLinkMovie, editTrailerMovie, getAllMovie, getDetailSingleMovie, getMovieCategories, getSeasonOfMovie, updateCategoryForMovie } from './MovieController';

const path = '/movie';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createMovie));

router.get('/all', jwtFilter, pagination(1, 10), controllerHandler(getAllMovie));

router.get('/seasons', jwtFilter, controllerHandler(getSeasonOfMovie));

router.put('/update-categories', jwtFilter, controllerHandler(updateCategoryForMovie));

router.get('/categories', jwtFilter, controllerHandler(getMovieCategories));

router.delete('/single/character', jwtFilter, controllerHandler(delCharacter));

router.put('/edit/single/linkTrailer', jwtFilter, controllerHandler(editTrailerMovie));

router.put('/edit/single/linkMovie', jwtFilter, controllerHandler(editLinkMovie));

router.put('/edit/single/director', jwtFilter, controllerHandler(editDirector));

router.put('/edit/single/description', jwtFilter, controllerHandler(editDescription));

router.post('/single/new-character', jwtFilter, controllerHandler(createCharacter));

router.get('/single/:id', jwtFilter, controllerHandler(getDetailSingleMovie));

export default { path, router };
