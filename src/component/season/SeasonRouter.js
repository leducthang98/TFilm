import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { addSeason, deleteSeason, updateSeason } from './SeasonController';

const path = '/season';
const router = Router();

router.post('/add', jwtFilter, controllerHandler(addSeason));

router.delete('/:id', jwtFilter, controllerHandler(deleteSeason));

router.put('/:id', jwtFilter, controllerHandler(updateSeason));



export default { path, router };
