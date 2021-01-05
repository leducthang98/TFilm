import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { createCharacterDAL, deleteCharacterDAL, getAllCharacterDAL, searchCharacterDAL, updateCharacterDAL } from "./CharacterDAL";

export const createCharacter = async (req, res, next) => {
    let id = uuidv4();
    const response = await createCharacterDAL(id, req.body)
    res.send(commonResponse({
        id: id,
        ...req.body
    }))
}

export const getAllCharacter = async (req, res, next) => {

    const response = await getAllCharacterDAL(req?.query?.sortColumn, req?.query?.sortType, req?.limit, req?.offset, req?.page, req?.size, req?.query?.gender);
    res.send(commonResponse(response))
}

export const deleteCharacter = async (req, res, next) => {
    const response = await deleteCharacterDAL(req?.params?.id);
    res.send(commonResponse({
        deletedCharacterId: req?.params?.id
    }))
}

export const updateCharacter = async (req, res, next) => {
    const response = await updateCharacterDAL(req?.params?.id, req?.body);
    res.send(commonResponse({
        updatedCharacterId: req?.params?.id
    }))
}

export const searchCharacter = async (req, res, next) => {
    const response = await searchCharacterDAL(req?.query?.searchData);
    res.send(commonResponse(response))
}
