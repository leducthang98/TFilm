import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { deleteCommentDAL } from "./CommentDAL";

export const deleteComment = async (req, res, next) => {
    const response = await deleteCommentDAL(req.params.id)
    res.send(commonResponse({
        id: req.params.id
    }))
}