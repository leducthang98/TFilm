import { commonResponse } from "../../util/ResponseForm";
import { getUserByUserId, updateUserByUserId, getAllUsersDAL } from "./UserDAL";

export const getMe = async (req, res, next) => {
    const { tokenDecoded } = req
    let userId = tokenDecoded.userId;
    const result = await getUserByUserId(userId);
    res.send(commonResponse(result))
}

export const updateMe = async (req, res, next) => {
    const { tokenDecoded } = req
    const dataUpdate = req.body;
    let userId = tokenDecoded.userId;
    const result = await updateUserByUserId(userId, dataUpdate);
    res.send(commonResponse({
        userId: userId,
        updatedData: dataUpdate
    }))
}

export const getAllUsers = async (req, res, next) => {
    const result = await getAllUsersDAL();
    res.send(commonResponse(result))
}