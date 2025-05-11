 import asyncHandler from '../utils/asynchandler.js';

 const registerUser = function  asyncHandler(req, res) {
 
 return  res.status(200).json({

   message: "ok"
})

}


export { registerUser }
