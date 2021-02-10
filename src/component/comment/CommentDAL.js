import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const deleteCommentDAL = async (commentId) => {
    let sql = 'update comment set deleted = 1 where id = ?';
    const result = await dbUtil.query(sql, [commentId])
    return result;
}