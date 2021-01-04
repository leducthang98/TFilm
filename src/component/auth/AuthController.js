import * as authDAL from './AuthDAL';

import * as jwtUtil from '../../util/Jwt';
import * as Bcrypt from '../../util/Bcrypt';
import { commonResponse } from "../../util/ResponseForm";
import { TOKEN } from "../../constant/Token";
import { ERRORS } from '../../constant/Errors';
import { hash, compare } from '../../util/Bcrypt';

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await authDAL.getUserByUsername(username);
        if (user) {
            const isPasswordValid = await compare(password, user.password);
            if (isPasswordValid) {
                let data = {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                }
                const token = await jwtUtil.generateToken(data, { expiresIn: TOKEN.TOKEN_EXPIRED })
                let tokenInfo = {
                    token: token,
                    timeExpireMs: TOKEN.TOKEN_EXPIRED
                }
                res.send(commonResponse(tokenInfo))
            } else {
                next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
            }
        } else {
            next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
        }
    } else {
        next(ERRORS.INVALID_INPUT_PARAMS)
    }
}

export const regist = async (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await authDAL.getUserByUsername(username);
        if (user) {
            next('Đã tồn tại người dùng này')
        } else {
            const passwordHash = hash(password);
            await authDAL.createNewAccount(username, passwordHash);
            res.send(commonResponse(req.body))
        }
    } else {
        next(ERRORS.INVALID_INPUT_PARAMS)
    }
}