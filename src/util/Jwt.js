import jwt from 'jsonwebtoken';
import CommonConfig from '../config/CommonConfig';

export const generateToken = (claims, options) => new Promise((resolve, reject) => {
    jwt.sign(claims, CommonConfig.JWT_SECRET, options || { noTimestamp: true }, (err, token) => {
        if (err) {
            reject(err)
        } else {
            resolve(token)
        }
    })
})

export const verifyToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, CommonConfig.JWT_SECRET, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})