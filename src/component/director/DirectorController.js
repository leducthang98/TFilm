import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createDirectorDAL } from "./DirectorDAL";


export const createDirector = async (req, res, next) => {
    let id = uuidv4();
    const response = await createDirectorDAL(id, req.body)
    res.send(commonResponse({
        id: id,
        ...req.body
    }))
}