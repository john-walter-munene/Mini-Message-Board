const { Router } = require('express');
const indexRouter = Router();

const { getMessages, getMessageForm, addNewMessage, getSpecificMessage, deleteMessage } = require('../controllers/indexController');


// Express resolves routes in declaration order.
// Static routes must appear before dynamic routes to avoid collisions.
indexRouter.get("/", getMessages);
indexRouter.get("/new", getMessageForm);
indexRouter.post("/new", addNewMessage);
indexRouter.get("/message/:messageId", getSpecificMessage);
indexRouter.post("/delete/:messageId", deleteMessage);

module.exports = indexRouter;