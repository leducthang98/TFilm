import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createDirectorDAL, deleteDirectorDAL, getAllDirectorDAL, updateDirectorDAL } from "./DirectorDAL";


export const createDirector = async (req, res, next) => {
    let id = uuidv4();
    const response = await createDirectorDAL(id, req.body)
    res.send(commonResponse({
        id: id,
        ...req.body
    }))
}

export const getAllDirector = async (req, res, next) => {
    const response = await getAllDirectorDAL(req?.limit, req?.offset, req?.page, req?.size)
    res.send(commonResponse(response))
}

export const deleteDirector = async (req, res, next) => {
    const response = await deleteDirectorDAL(req.params.id)
    res.send(commonResponse({
        deletedDirectorId: req.params.id
    }))
}

export const updateDirector = async (req, res, next) => {
    const response = await updateDirectorDAL(req.params.id, req.body)
    res.send(commonResponse({
        id: req.params.id,
        ...req.body
    }))
}