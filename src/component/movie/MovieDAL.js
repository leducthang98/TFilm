import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const createMovieDAL = async (id, data) => {
    const transaction = await dbUtil.beginTransaction();
    try {
        let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
        const sql = 'insert into `movie` (id, name, description, image, created_at, updated_at, deleted, director_id, link_movie) values (?,?,?,?,?,?,?,?,?)';
        await dbUtil.executeInTransaction(sql, [id, data.name, data.description, data.image, created_at, created_at, 0, data.directorId, data.linkMovie]).catch(err => {
            throw err;
        })
        for (let i = 0; i < data.category.length; i++) {
            let categoryTemp = data.category[i];
            let movieCategoryId = uuidv4();
            let addCategoryMovieSql = 'insert into `movie_category` (id, movie_id, category_id) values (?,?,?)';
            await dbUtil.executeInTransaction(addCategoryMovieSql, [movieCategoryId, id, categoryTemp]).catch(err => {
                throw err;
            })
        }
        await dbUtil.commitTransaction(transaction);
        return true;
    } catch (e) {
        await dbUtil.rollbackTransaction(transaction);
        return e;
    }
}

export const getAllMovieDAL = async (searchData, category, limit, offset, page, size) => {
    let sql = 'select m.*, mc.category_id,c.category_name from `movie` m LEFT JOIN `movie_category` mc on m.id = mc.movie_id INNER JOIN `category` c on c.id = mc.category_id where m.deleted = 0';
    let params = [];
    if (category) {
        sql += ' and mc.category_id = ?';
        params.push(category)
    }
    if (searchData) {
        sql += ' and lower(name) like ?';
        params.push('%' + searchData.toLowerCase() + '%');
    }
    params.push(limit)
    params.push(offset)
    sql += ' limit ? offset ?';
    const result = await dbUtil.query(sql, params);

    // count
    let countSql = 'select count(id) as count from `movie` m LEFT JOIN `movie_category` mc on m.id = mc.movie_id INNER JOIN `category` c on c.id = mc.category_id where m.deleted = 0';
    let paramsCount = []
    if (category) {
        countSql += ' and mc.category_id = ?';
        paramsCount.push(category)
    }
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

export const getSeasonOfMovieDAL = async (movieId) => {
    let sql = 'select * from season where movie_id = ? and deleted = 0 order by created_at DESC';
    const result = await dbUtil.query(sql, [movieId]);
    return result;
}

export const getCategoriesOfMovieDAL = async (movieId) => {
    let sql = 'SELECT mc.category_id as categoryId,c.category_name as categoryName from movie_category mc INNER JOIN category c ON mc.category_id = c.id WHERE movie_id = ?';
    const result = await dbUtil.query(sql, [movieId]);
    return result;
}

export const updateCategoryForMovieDAL = async (movieId, categoriesId) => {
    const transaction = await dbUtil.beginTransaction();
    try {
        // delete data
        let deleteOldDataSql = 'delete from movie_category where movie_id = ?';
        await dbUtil.executeInTransaction(deleteOldDataSql, [movieId], transaction).catch(err => {
            throw err
        });
        //
        for (let i = 0; i < categoriesId.length; i++) {
            let movieCategoryId = uuidv4();
            let insertMovieCategorySql = 'insert into movie_category (id,movie_id,category_id) values (?,?,?)';
            await dbUtil.executeInTransaction(insertMovieCategorySql, [movieCategoryId, movieId, categoriesId[i]], transaction).catch(err => {
                throw err
            });
        }
        await dbUtil.commitTransaction(transaction);
        return true;
    } catch (e) {
        await dbUtil.rollbackTransaction(transaction);
        return e;
    }
}
