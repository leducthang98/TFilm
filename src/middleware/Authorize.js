import { ERRORS } from "../constant/Errors";

export const requireAdmin = async (req, res, next) => {
    const crediental = req.tokenDecoded;
    console.log('cre', crediental)
    if (crediental?.role === 'admin') {
        next();
    } else {
        next(ERRORS.TOKEN_NOT_ALLOWED);
    }
}