import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createMovieDAL, getAllMovieDAL } from "./MovieDAL";

export const createMovie = async (req, res, next) => {
    let id = uuidv4();
    const response = await createMovieDAL(id, req.body)
    res.send(commonResponse({
        id: id,
        ...req.body
    }))
}

export const getAllMovie = async (req, res, next) => {
    const response = await getAllMovieDAL(req?.limit, req?.offset, req?.page, req?.size)
    res.send(commonResponse(response))
}