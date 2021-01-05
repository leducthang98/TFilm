import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';

export const getUserByUsername = async (username, password) => {
    const sql = 'select * from account where username = ?';
    const result = await dbUtil.queryOne(sql, [username, password]);
    return result;
}

export const createNewAccount = async (username, password) => {
    let uuid = uuidv4();
    const sql = 'insert into account (id, username, password, role) values (?, ?, ?, ?)';
    const result = await dbUtil.query(sql, [uuid, username, password, 'user']);
    return result;
}