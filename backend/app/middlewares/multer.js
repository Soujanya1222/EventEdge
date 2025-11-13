const multer = require('multer');
const { storage } = require('../middlewares/cloudinary');
const upload = multer({ storage });
module.exports = upload;