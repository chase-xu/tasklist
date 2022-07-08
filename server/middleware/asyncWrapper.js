/** use to replace the try's in controller and return error */
const asyncWrapper=(fn)=>{
    return async (req, res, next)=>{
        try{
            await fn(req, res, next)
        } catch(err){
            next(err)
        }
    }
}

module.exports = asyncWrapper