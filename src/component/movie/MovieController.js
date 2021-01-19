import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createMovieDAL, getAllMovieDAL, getCategoriesOfMovieDAL, getSeasonOfMovieDAL, updateCategoryForMovieDAL } from "./MovieDAL";

export const createMovie = async (req, res, next) => {
    let id = uuidv4();
    const response = await createMovieDAL(id, req.query.movieType, req.body)
    res.send(commonResponse(response))
}

export const getAllMovie = async (req, res, next) => {
    const response = await getAllMovieDAL(req.query.searchData, req.query.category, req.query.movieType, req?.limit, req?.offset, req?.page, req?.size)
    res.send(commonResponse(response))
}

export const getSeasonOfMovie = async (req, res, next) => {
    const response = await getSeasonOfMovieDAL(req?.query?.id)
    res.send(commonResponse(response))
}

export const updateCategoryForMovie = async (req, res, next) => {
    const response = await updateCategoryForMovieDAL(req?.query?.id, req.body)
    res.send(commonResponse(response))
}

export const getMovieCategories = async (req, res, next) => {
    const response = await getCategoriesOfMovieDAL(req?.query?.id)
    res.send(commonResponse(response))
}