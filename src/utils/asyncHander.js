const asyncHander = (reqHander) => {
    (req, res, next) => {
        Promise.resolve(reqHander(req, res, next))
        .catch((err) => next(err));
    }
}

export {asyncHander};

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