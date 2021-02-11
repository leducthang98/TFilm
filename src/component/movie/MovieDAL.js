import * as dbUtil from '../../util/Database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
// default: series Movies
// single: single Movies

export const createMovieDAL = async (id, movieType, data) => {
    // 1 : series, 0: single
    const transaction = await dbUtil.beginTransaction();
    try {
        let created_at = moment().format('YYYY-MM-DD hh:mm:ss');
        const sql = 'insert into `movie` (id, name, description, image, created_at, updated_at, deleted, director_id, link_trailer,single_episode) values (?,?,?,?,?,?,?,?,?,?)';
        await dbUtil.executeInTransaction(sql, [id, data.name, data.description, data.image, created_at, created_at, 0, data.directorId, data.linkTrailer, movieType === 'series' ? 2 : 1]).catch(err => {
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
        if (movieType === 'single') {
            console.log('SINGLE_MOVIE')
            let seasonId = uuidv4();
            let seasonName = id + '_' + data.name + '_season';
            let addSeasonForSingleMovieSql = 'insert into season (id,movie_id,name,image,description,deleted,created_at,updated_at) values (?,?,?,?,?,?,?,?)';
            await dbUtil.executeInTransaction(addSeasonForSingleMovieSql, [seasonId, id, seasonName, data.image, data.description, 0, created_at, created_at]).catch(err => {
                throw err;
            })
            // tao eps
            let episodeId = uuidv4();
            let epsName = id + '_' + data.name + '_episode';
            let addEpsForSingleMovieSql = 'insert into episode (id, season_id, name,image,description,deleted,created_at,updated_at,url,single_episode) values (?,?,?,?,?,?,?,?,?,?)';
            await dbUtil.executeInTransaction(addEpsForSingleMovieSql, [episodeId, seasonId, epsName, data.image, data.description, 0, created_at, created_at, data.linkFilm, 1]).catch(err => {
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


export const getAllMovieDAL = async (searchData, category, movieType, limit, offset, page, size) => {
    let sql = 'select m.*, mc.category_id,c.category_name from `movie` m LEFT JOIN `movie_category` mc on m.id = mc.movie_id INNER JOIN `category` c on c.id = mc.category_id where m.deleted = 0';
    let params = [];
    if (category) {
        sql += ' and mc.category_id = ?';
        params.push(category)
    } else {
        sql = 'select * from movie m where m.deleted = 0';
    }
    if (movieType) {
        if (movieType == 'series') {
            sql += ' and single_episode = 2';
        } else {
            sql += ' and single_episode = 1';
        }
    }
    if (searchData) {
        sql += ' and lower(name) like ?';
        params.push('%' + searchData.toLowerCase() + '%');
    }
    params.push(limit)
    params.push(offset)
    sql += ' limit ? offset ?';
    let result = await dbUtil.query(sql, params);

    // count
    let countSql = 'select count(m.id) as count from `movie` m LEFT JOIN `movie_category` mc on m.id = mc.movie_id INNER JOIN `category` c on c.id = mc.category_id where m.deleted = 0';
    let paramsCount = []
    if (category) {
        countSql += ' and mc.category_id = ?';
        paramsCount.push(category)
    } else {
        countSql = 'select count(m.id) as count from movie m where m.deleted = 0';
    }

    if (movieType) {
        if (movieType == 'series') {
            countSql += ' and single_episode = 2';
        } else {
            countSql += ' and single_episode = 1';
        }
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

    for (let i = 0; i < result.length; i++) {
        let movieType = 'unknown'
        if (result[i].single_episode == 1) {
            movieType = 'single'
        } else if (result[i].single_episode == 2) {
            movieType = 'series'
        }
        result[i] = {
            ...result[i],
            movie_type: movieType
        }
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

export const getDetailSingleMovieDAL = async (movieId) => {
    //, , ,  comment
    let sql = 'select m.id,m.name, m.description, m.link_trailer,m.single_episode,d.name as director_name, d.dob as director_dob, e.url as link_movie, e.id as episode_id from movie m LEFT JOIN director d on m.director_id = d.id  LEFT JOIN season s on m.id = s.movie_id LEFT JOIN episode e on s.id = e.season_id WHERE m.deleted = 0 and m.id = ?';
    let result = await dbUtil.queryOne(sql, [movieId]);
    if (result.single_episode != 1) {
        throw 'Không phải phim lẻ';
    } else {
        // get rate
        let getRateSql = 'SELECT AVG(mark) as rate from rate WHERE movie_id = ?';
        let rateResult = await dbUtil.queryOne(getRateSql, [movieId]);
        let rate = rateResult.rate
        // get actors from eps
        let episodeId = result.episode_id;
        let getCharacterSql = 'SELECT c.* from character_episode ce LEFT JOIN `character` c on ce.character_id = c.id WHERE episode_id = ?';
        let characters = await dbUtil.query(getCharacterSql, [episodeId]);
        // get comments
        let getCommentSql = 'SELECT  c.id, a.username,a.first_name,a.last_name,c.content from `comment` c LEFT JOIN account a on c.account_id = a.id WHERE c.episode_id = ? and c.deleted = 0 ORDER BY c.created_at DESC';
        let comments = await dbUtil.query(getCommentSql, [episodeId]);
        result = {
            ...result,
            rate: rate,
            characters: characters,
            comments: comments
        }
        return result
    }
}

export const delCharacterMovieDAL = async (characterId) => {
    let delCharacterSql = 'delete   from character_episode  where  id = ?';
    let delResult = await dbUtil.queryOne(delCharacterSql, [characterId]);
    return delResult
}

export const createCharacterMovieDAL = async (data) => {
    const checkExistSql = 'select * from `character_episode` where character_id=? and episode_id=?'
    const checkExistResult = await dbUtil.query(checkExistSql, [data.character_id, data.episode_id])
    console.log(checkExistResult);
    const length = checkExistResult.length
    let result = null;
    if (length < 1) {
        const createCharacterSql = 'insert into `character_episode` (  character_id, episode_id ) values ( ?,?)';
        result = await dbUtil.query(createCharacterSql, [data.character_id, data.episode_id]);
        console.log(result);
    } else {
        throw Error('Đã là diễn viên của phim')
    }
    return result;

}


export const editTrailerMovieDAL = async (data) => {
    const checkExistSql = 'select * from `movie` where id=?'
    const checkExistResult = await dbUtil.query(checkExistSql, [data.movieId])
    console.log(checkExistResult);
    const length = checkExistResult.length

    if (length > 0) {
        const editLinkTrailer = 'update `movie` set link_trailer= ? where id=?';
        const result = await dbUtil.query(editLinkTrailer, [data.linkTrailer, data.movieId])
        return result
    } else {
        throw Error('Phim không tồn tại!')
    }

}

export const editLinkMovieDAL = async (data) => {
    const checkExistSql = 'select * from `movie` m , `episode` ep, `season` sea where m.id=sea.movie_id and sea.id= ep.season_id and ep.id=?'
    const checkExistResult = await dbUtil.query(checkExistSql, [data.episodeId])
    console.log(checkExistResult);
    const length = checkExistResult.length

    if (length > 0) {
        const editLinkMovie = 'update `episode` set url= ? where id=?';
        const result = await dbUtil.query(editLinkMovie, [data.linkFilm, data.episodeId])
        return result
    } else {
        throw Error('Phim không tồn tại!')
    }

}



export const editDirectorDAL = async (data) => {
    const checkExistSql = 'select * from `movie` m , `episode` ep, `season` sea where m.id=sea.movie_id and sea.id= ep.season_id and ep.id=?'
    const checkExistResult = await dbUtil.query(checkExistSql, [data.episodeId])
    console.log(checkExistResult);
    const length = checkExistResult.length
    if (length > 0) {
        const editDirector = 'update `episode` set description= ? where id=?';
        const result = await dbUtil.query(editDirector, [data.description, data.episodeId])
        return result
    } else {
        throw Error('Phim không tồn tại!')
    }

}

export const editDescriptionDAL = async (data) => {
    const checkExistSql = 'select * from `movie` where id=?'
    const checkExistResult = await dbUtil.query(checkExistSql, [data.movieId])
    console.log(checkExistResult);
    const length = checkExistResult.length
    if (length > 0) {
        const editDescription = 'update `movie` set director_id= ? where id=?';
        const result = await dbUtil.query(editDescription, [data.directorId, data.movieId])
        return result
    } else {
        throw Error('Phim không tồn tại!')
    }

}
