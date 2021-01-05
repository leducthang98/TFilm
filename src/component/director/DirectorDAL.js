import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const createDirectorDAL = async (id, data) => {
    let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
    const sql = 'insert into `director` (id, name, dob, description, deleted, created_at, updated_at) values (?,?,?,?,?,?,?)';
    const result = await dbUtil.query(sql, [id, data.name, moment(data.dob).format('YYYY-MM-DD hh:mm:ss'), data.description, 0, created_at, created_at]);
    return result;
}
