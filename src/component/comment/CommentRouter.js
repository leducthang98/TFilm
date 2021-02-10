import { Router } from 'express';
import { jwtFilter } from '../../middleware/Authenticate';
import { requireAdmin } from '../../middleware/Authorize';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { deleteComment } from './CommentController';

const path = '/comment';
const router = Router();

router.delete('/:id', jwtFilter, requireAdmin, controllerHandler(deleteComment));


export default { path, router };
