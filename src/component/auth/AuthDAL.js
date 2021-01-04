import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';

export const getUserByUsername = async (username, password) => {
    const sql = 'select * from account where username = ?';
    const result = await dbUtil.queryOne(sql, [username, password]);
    return result;
}

export const createNewAccount = async (username, password, email) => {
    let uuid = uuidv4();
    const sql = 'insert into account (id, username, password) values (?, ?, ?)';
    const result = await dbUtil.query(sql, [uuid, username, password]);
    return result;
}