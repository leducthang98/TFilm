import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';

import { controllerHandler } from '../../middleware/ErrorHandler';
import { pagination } from '../../middleware/Pagination';
import { createCharacter, deleteCharacter, getAllCharacter, searchCharacter, updateCharacter } from './CharacterController';

const path = '/character';
const router = Router();

router.post('/create', jwtFilter, controllerHandler(createCharacter));

router.get('/all', jwtFilter, pagination(0, 10), controllerHandler(getAllCharacter));

router.delete('/:id', jwtFilter, controllerHandler(deleteCharacter));

router.put('/:id', jwtFilter, controllerHandler(updateCharacter));

router.get('/search', jwtFilter, controllerHandler(searchCharacter));



export default { path, router };
