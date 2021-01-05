import { ERRORS } from "../constant/Errors";
import * as jwtUtil from '../util/Jwt';

// json-web-token filter
export const jwtFilter = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('====================================');
    console.log(authorization);
    console.log('====================================');
    if (authorization && authorization.match(/^Bearer /g)) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                const tokenDecoded = await jwtUtil.verifyToken(token)
                req.tokenDecoded = tokenDecoded;
                next();
            } catch (error) {
                next(ERRORS.UNAUTHORIZED_ERROR);
            }
        }
    } else {
        next(ERRORS.TOKEN_REQUIRED);
    }
}