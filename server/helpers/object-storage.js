const cloudinary = require('cloudinary').v2;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadFile = (file) => {
  const uploader = new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: file.originalname.split('.')[0], folder: 'fylo-storage' },
        (error, uploadResult) => {
          return resolve(uploadResult);
        }
      )
      .end(file.buffer);
  });

  const result = uploader
    .then((uploadResult) => {
      console.log(
        `Buffer upload_stream with promise success - ${uploadResult.url}`
      );
      return uploadResult;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
};

const deleteFile = async (fileId) => {
  const result = await cloudinary.uploader.destroy(fileId);

  return result;
};

module.exports = {
  uploadFile,
  deleteFile,
};
