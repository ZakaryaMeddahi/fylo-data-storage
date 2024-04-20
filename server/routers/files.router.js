const { createFile, removeFile, getFiles } = require('../controllers/files.controller');

const router = require('express').Router();

router.route('/').post(createFile).get(getFiles);
router.route('/:id').delete(removeFile);

module.exports = router;