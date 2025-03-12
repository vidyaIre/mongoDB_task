const errorHandler = (req, res, next) => {
    if (req.query) {
        if (req.query.token === 'validToken') {
            next();
        } else {
            res.status(200).json({
                success: false,
                statusode: 401,
                message: "Invalid token"
            })
        }
    } else {
        res.status(200).json({
            success: false,
            statusode: 401,
            message: "Invalid request"
        })
    }
}

module.exports = errorHandler;