import { commonResponse } from "../../util/ResponseForm";
import { ERRORS } from '../../constant/Errors';
import { v4 as uuidv4 } from 'uuid';
import { getAllCategoryDAL } from "./CategoryDAL";


export const getAllCategory = async (req, res, next) => {
    const response = await getAllCategoryDAL()
    res.send(commonResponse(response))
}
