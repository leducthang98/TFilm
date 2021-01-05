
import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export const createCharacterDAL = async (id, data) => {
    let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
    const sql = 'insert into `character` (id, name, dob, gender, deleted, address, image, description, created_at, updated_at) values (?,?,?,?,?,?,?,?,?,?)';
    const result = await dbUtil.query(sql, [id, data.name, data.dob ? moment(data.dob).format('YYYY-MM-DD hh:mm:ss') : null, data.gender, 0, data.address, data.image, data.description, created_at, created_at]);
    return result;
}

export const getAllCharacterDAL = async (sortColumn, sortType, limit, offset, page, size, gender) => {
    if (sortType == 0) {
        sortType = 'DESC'
    } else {
        sortType = 'ASC'
    }
    let sql = 'select * from `character` where deleted = 0'
    let params = []
    if (gender) {
        sql += ' and gender = ?';
        params.push(gender)
    }
    params.push(limit)
    params.push(offset)
    if (sortColumn) {
        sql += ' order by ' + sortColumn + ' ' + sortType;
    }
    sql += ' limit ? offset ?';
    const resultData = await dbUtil.query(sql, params);

    let countSql = 'select count(id) as count from `character` where deleted = 0';
    let paramsCount = []
    if (gender) {
        countSql += ' and gender = ?';
        paramsCount.push(gender)
    }
    let totalRecordResponse = await dbUtil.queryOne(countSql, paramsCount);
    let count = totalRecordResponse.count
    let totalPage = 0;
    if (count % limit == 0) {
        totalPage = count / limit
    } else {
        totalPage = (count / limit) + 1
    }

    const result = {
        data: resultData,
        pagination: {
            size: size,
            page: page,
            totalPage: parseInt(totalPage),
            totalRecord: count
        }
    }

    return result
}

export const deleteCharacterDAL = async (id) => {
    let sql = 'update `character` set deleted = 1 where id = ?';
    const result = await dbUtil.query(sql, [id]);
    return result;
}

export const updateCharacterDAL = async (id, data) => {
    let updatePart = 'update `character` set id = id';
    let params = []

    if (data.name) {
        updatePart += ', name = ?';
        params.push(data.name)
    }

    if (data.dob) {
        updatePart += ', dob = ?';
        params.push(moment(data.dob).format('YYYY-MM-DD'))
    }

    if (data.gender) {
        updatePart += ', gender = ?';
        params.push(data.gender)
    }

    if (data.address) {
        updatePart += ', address = ?';
        params.push(data.address)
    }

    if (data.image) {
        updatePart += ', image = ?';
        params.push(data.image)
    }

    if (data.description) {
        updatePart += ', description = ?';
        params.push(data.description)
    }

    updatePart += ', updated_at = ?';
    params.push(moment().format('YYYY-MM-DD hh:mm:ss'))

    let conditionPart = ' where id = ?;';
    params.push(id)

    let sql = updatePart + conditionPart

    const result = await dbUtil.query(sql, params);
    return result;

}

export const searchCharacterDAL = async (searchData, limit, offset, page, size) => {
    let sql = 'select * from `character` where deleted = 0';
    let params = []
    if (searchData) {
        sql += ' and lower(name) like ?';
        params.push('%' + searchData.toLowerCase() + '%');
    }
    params.push(limit)
    params.push(offset)
    sql += ' limit ? offset ?';
    const result = await dbUtil.query(sql, params);

    let countSql = 'select count(id) as count from `character` where deleted = 0';
    let paramsCount = []
    if (searchData) {
        countSql += ' and lower(name) like ?';
        paramsCount.push('%' + searchData.toLowerCase() + '%');
    }
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