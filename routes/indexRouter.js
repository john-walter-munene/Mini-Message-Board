const { Router } = require('express');
const indexRouter = Router();

const { getMessages, getMessageForm, addNewMessage } = require('../controllers/indexController');

indexRouter.get("/", getMessages);
indexRouter.get("/new", getMessageForm);
indexRouter.post("/new", addNewMessage);

module.exports = indexRouter;