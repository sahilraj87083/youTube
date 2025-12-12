
// A utility function to handle asynchronous operations

const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((error) => next(error));
    }
}








// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
// higher order function to wrap async functions and handle errors

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             message : error.message || "Internal Server Error"
//         })
//     }
// }


export {asyncHandler}

