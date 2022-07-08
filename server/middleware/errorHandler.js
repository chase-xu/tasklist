/** costumized error handler, or we could use express's default error return */
const errorHandlerMiddleware = (err, req, res, next)=>{
    return res.status(err.status).json({msg: err.message, })
}

module.exports = errorHandlerMiddleware