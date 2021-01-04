import { ERRORS } from "../constant/Errors";

export const requireAdmin = async (req, res, next) => {
    const crediental = req.tokenDecoded;
    if (crediental?.role === 'ADMIN') {
        next();
    } else {
        next(ERRORS.TOKEN_NOT_ALLOWED);
    }
}