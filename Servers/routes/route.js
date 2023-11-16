const express = require('express');
const {createMessage, getMessageById, getMessages, updateMessage } = require('../controller/post.js');
const router = express.Router();

router.post('/',createMessage);
router.get('/:id',getMessageById);
// router.delete('/:id',);
router.get('/',getMessages);
router.patch('/:id',updateMessage);

module.exports =  router;