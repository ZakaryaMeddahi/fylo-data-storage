const { uploadFile, deleteFile } = require('../helpers/object-storage');
const File = require('../models/File');

const createFile = async (req, res) => {
  try {
    const { id } = req.user;
    const { file } = req;

    /*console.log(file);
    res.status(201).json({
      message: 'File created successfully',
      data: file,
    });
    return;*/

    if (!file) {
      return res.status(400).json({
        message: 'File is required',
      });
    }

    const uploadedFile = await uploadFile(file);
    console.log(uploadedFile);

    const name =
      uploadedFile.public_id.split('/')[1] ||
      uploadedFile.public_id.split('/')[0];

    console.log(name);

    const {
      secure_url: path,
      format,
      resource_type: type,
      bytes: size,
    } = uploadedFile;

    const newFile = await File.create({
      name,
      path,
      format,
      type,
      size,
      createdBy: id,
    });

    await newFile.save();

    res.status(201).json({
      message: 'File created successfully',
      data: newFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const files = await File.find({ createdBy: userId });

    res.status(200).json({
      message: 'Files loaded successfully',
      data: files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const removeFile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const file = await File.findOne({ _id: id, createdBy: userId });

    if (!file) {
      res.status(404).json({
        message: 'File not found',
      });
      return;
    }

    await deleteFile(`${process.env.CLOUDINARY_FOLDER}/${file.name}`);

    await file.deleteOne();

    res.status(200).json({
      message: 'File removed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createFile,
  getFiles,
  removeFile,
};
