import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const createMovieDAL = async (id, data) => {
    // add category
    let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
    //id, name, desc, img, create_at, update_at, deleted, director_id, link_movie
    const sql = 'insert into `movie` (id, name, description, image, created_at, updated_at, deleted, director_id, link_movie) values (?,?,?,?,?,?,?,?,?)';
    const result = await dbUtil.query(sql, [id, data.name, data.description, data.image, created_at, created_at, 0, data.directorId, data.linkMovie]);
    return result;
}

export const getAllMovieDAL = async (limit, offset, page, size) => {
    let sql = 'select * from movie where deleted = 0';
    let params = [];
    params.push(limit)
    params.push(offset)
    sql += ' limit ? offset ?';
    const result = await dbUtil.query(sql, params);

    // count

    let countSql = 'select count(id) as count from `movie` where deleted = 0';
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


export const getSeasonOfMovieDAL = async (movieId) => {
    let sql = 'select * from season where movie_id = ? and deleted = 0 order by created_at DESC';
    const result = await dbUtil.query(sql, [movieId]);
    return result;
}
