
export const pagination = (page = 1, size = 10) => async (req, res, next) => {
    let actualPage = req.query.page || page;
    let actualSize = req.query.size || size;
    req.offset = parseInt((actualPage - 1) * actualSize);
    req.limit = parseInt(actualSize);
    req.page = parseInt(actualPage);
    req.size = parseInt(actualSize);
    next();
}