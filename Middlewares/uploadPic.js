// Include Upload Util
const Upload = require('./Upload');

// uploadPic Middleware
const uploadPic = async (req, res, next) => {
    Upload(req, res, (err) => {
        if (err) next(err.message);
        else if(req.file === undefined) next('لا يوجد ملف تم رفعه');
        else next();
    })
}
module.exports = uploadPic;