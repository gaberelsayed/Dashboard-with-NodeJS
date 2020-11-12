const multer = require("multer");
const path = require("path"); 
const Upload = multer({
  storage: multer.diskStorage({})
})
module.exports = Upload;