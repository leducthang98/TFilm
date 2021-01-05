import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const createDirectorDAL = async (id, data) => {
    let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
    const sql = 'insert into `director` (id, name, dob, description, deleted, created_at, updated_at) values (?,?,?,?,?,?,?)';
    const result = await dbUtil.query(sql, [id, data.name, data.dob ? moment(data.dob).format('YYYY-MM-DD hh:mm:ss') : null, data.description, 0, created_at, created_at]);
    return result;
}

export const getAllDirectorDAL = async (limit, offset, page, size) => {
    let sql = 'select * from director where deleted = 0';
    let params = []
    params.push(limit)
    params.push(offset)
    sql += ' limit ? offset ?';
    const result = await dbUtil.query(sql, params);

    // count

    let countSql = 'select count(id) as count from `director` where deleted = 0';
    let paramsCount = []
    let totalRecordResponse = await dbUtil.queryOne(countSql, paramsCount);
    let count = totalRecordResponse.count
    let totalPage = 0;
    if (count % limit == 0) {
        totalPage = count / limit
    } else {
        totalPage = (count / limit) + 1
    }

    const finalResult = {
        data: result,
        pagination: {
            size: size,
            page: page,
            totalPage: parseInt(totalPage),
            totalRecord: count
        }
    }

    return finalResult;
}

export const deleteDirectorDAL = async (id) => {
    let sql = 'update director set deleted = 1 where id = ?';
    const result = await dbUtil.query(sql, [id]);
    return result;
}

export const updateDirectorDAL = async (id, data) => {
    let updatePart = 'update director set id = id';
    let params = [];
    if (data.name) {
        updatePart += ', name = ?';
        params.push(data.name)
    }
    if (data.dob) {
        updatePart += ', dob = ?';
        params.push(data.dob)
    }
    if (data.description) {
        updatePart += ', description = ?';
        params.push(data.description)
    }
    let conditionPart = ' where id = ?';
    params.push(id)
    let sql = updatePart + conditionPart
    // name, dob, description
    const result = await dbUtil.query(sql, params);
    return result;
}