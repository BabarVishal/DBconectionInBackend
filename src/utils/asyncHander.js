const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
         Promise.resolve(reqHandler(req, res, next))
         .catch((err) => next(err));
     }
 }
 
 export { asyncHandler };
 
// const asyncHanderSecond = (fn) => async(req, res, next) => {
// try {
//     await fn(req, res, next)
// } catch (error) {
//     res.status(err.code || 5000).json({
//         success: false,
//         message: err.message
//     })
// }
// }