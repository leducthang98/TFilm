import * as dbUtil from '../../util/Database';
import { hash, compare } from '../../util/Bcrypt';
import { ERRORS } from '../../constant/Errors';

export const getUserByUserId = async (userId) => {
    let sql = 'select * from account where id = ?';
    const result = await dbUtil.queryOne(sql, [userId]);
    delete result.password;
    return result;
}

// export const updateUserByUserId = async (userId, data) => {
//     let updatePart = 'update account set id = id';
//     let params = []
//     console.log(data)
//     if (data.fullname) {
//         updatePart += ', fullname = ?';
//         params.push(data.fullname)
//     }
//     if (data.address) {
//         updatePart += ', address = ?';
//         params.push(data.address)
//     }
//     if (data.password) {
//         let passwordHashed = hash(data.password)
//         updatePart += ', password = ?';
//         params.push(passwordHashed)
//     }
//     if (data.email) {
//         updatePart += ', email = ?';
//         params.push(data.email)
//     }
//     if (data.age) {
//         updatePart += ', age = ?';
//         params.push(data.age)
//     }
//     if (data.gender) {
//         if (data.gender === 1 || data.gender === 2) {
//             updatePart += ', gender = ?';
//             params.push(data.gender)
//         } else {
//             throw ERRORS.INVALID_INPUT_PARAMS;
//         }
//     }
//     if (data.image) {
//         updatePart += ', image = ?';
//         params.push(data.image)
//     }
//     let conditionPart = ' where id = ?;';
//     params.push(userId)
//     let sql = updatePart + conditionPart
//     const result = await dbUtil.queryOne(sql, params);
//     return result;
// }

// export const getAllUsersDAL = async () => {
//     let sql = 'select * from account';
//     let result = await dbUtil.query(sql, []);
//     for (let index = 0; index < result.length; index++) {
//         delete result[index].password
//         delete result[index].role
//     }
//     return result;
// }