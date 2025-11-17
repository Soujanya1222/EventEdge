const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const deleteOldImages = async (images = []) => {
  for (const url of images) {
    const publicId = url.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }
};
module.exports = { cloudinary, storage,deleteOldImages };
