import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createCharacterMovieDAL, editDirectorDAL, createMovieDAL, delCharacterMovieDAL, editLinkMovieDAL, editTrailerMovieDAL, getAllMovieDAL, getCategoriesOfMovieDAL, getDetailSingleMovieDAL, getSeasonOfMovieDAL, updateCategoryForMovieDAL } from "./MovieDAL";

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
export const getDetailSingleMovie = async (req, res, next) => {
    const response = await getDetailSingleMovieDAL(req?.params?.id)
    res.send(commonResponse(response))
}

export const delCharacter = async (req, res, next) => {
    const response = await delCharacterMovieDAL(req?.query?.id)
    res.send(commonResponse(response))
}

export const createCharacter = async (req, res, next) => {
    const response = await createCharacterMovieDAL(req.body)
    res.send(commonResponse({
        ...req.body,
    }))
}

export const editTrailerMovie = async (req, res, next) => {
    const response = await editTrailerMovieDAL(req.body)
    res.send(commonResponse({
        ...req.body,
    }))
}

export const editLinkMovie = async (req, res, next) => {
    const response = await editLinkMovieDAL(req.body)
    res.send(commonResponse({
        ...req.body,
    }))
}
export const editDirector = async (req, res, next) => {
    const response = await editDirectorDAL(req.body)
    res.send(commonResponse({
        ...req.body,
    }))
}