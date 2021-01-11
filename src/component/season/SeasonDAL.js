import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export const addSeasonDAL = async (seasonId, movieId, data) => {
    let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
    let sql = 'insert into season (id,movie_id,name,image,description,deleted,created_at,updated_at) values (?,?,?,?,?,?,?,?)';
    const result = await dbUtil.query(sql, [seasonId, movieId, data.name, data.image, data.description, 0, created_at, created_at]);
    return result;
}

export const deleteSeasonDAL = async (seasonId) => {
    let sql = 'update season set deleted= 1 where id = ?';
    const result = await dbUtil.query(sql, [seasonId])
    return result;
}

export const updateSeasonDAL = async (seasonId, data) => {
    let updatePart = 'update season set id = id';
    let params = [];
    if (data.name) {
        updatePart += ', name = ?';
        params.push(data.name)
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
    params.push(moment().format('YYYY-MM-DD hh:mm:ss'));
    
    let conditionPart = ' where id = ?';
    params.push(seasonId)
    let sql = updatePart + conditionPart
    // name, dob, description
    const result = await dbUtil.query(sql, params);
    return result;
}

