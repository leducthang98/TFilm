import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const getAllCategoryDAL = async () => {
    let sql = 'select * from category';
    const result = await dbUtil.query(sql, []);
    return result;
}