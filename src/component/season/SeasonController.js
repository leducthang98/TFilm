import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { addSeasonDAL, deleteSeasonDAL, updateSeasonDAL } from "./SeasonDAL";

export const addSeason = async (req, res, next) => {
    let id = uuidv4();
    const response = await addSeasonDAL(id, req.query.movieId, req.body)
    res.send(commonResponse({
        id: id,
        movieId: req.query.movieId,
        ...req.body
    }))
}

export const deleteSeason = async (req, res, next) => {
    const response = await deleteSeasonDAL(req.params.id)
    res.send(commonResponse({
        id: req.query.id
    }))
}

export const updateSeason = async (req, res, next) => {
    const response = await updateSeasonDAL(req.params.id, req.body)
    res.send(commonResponse({
        id: req.query.id,
        data: req.body
    }))
} 