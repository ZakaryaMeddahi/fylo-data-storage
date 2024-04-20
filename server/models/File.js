const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'Please provide file name'],
      type: String,
    },
    type: {
      required: [true, 'Please provide file type'],
      type: String,
    },
    path: {
      required: [true, 'Please provide file path'],
      type: String,
    },
    type: {
      required: [true, 'Please provide file type'],
      type: String,
    },
    format: {
      required: [true, 'Please provide file format'],
      type: String,
    },
    size: {
      required: [true, 'Please provide file size'],
      type: String,
    },
    createdBy: {
      required: [true, 'Please provide user id'],
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);
