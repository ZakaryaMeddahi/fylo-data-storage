const mongoose = require('mongoose');

const connect = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connect