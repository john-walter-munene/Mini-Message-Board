const { messages } = require('../messages');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

// Get all the messages.
const getMessages = async (request, response) => {
    const messagesInDB = await messages;

    if (!messagesInDB) throw new CustomNotFoundError("No Messages Found!");

    const formattedMessages = messagesInDB.map(message => ({...message, added: formatDate(message.added)}));

    response.render("index", { messages: formattedMessages });
}

// Date formatter func
const formatDate = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    weekday: "short",  // Mon, Tue...
    day: "numeric",
    month: "short",    // Jan, Feb...
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Nairobi" // East African Time
  });
};

// Deliver a form to create new messages.
const getMessageForm = (request, response) => {
    response.render("form");
};

const addNewMessage = (request, response) => {
    const { authorName, messageText } = request.body;
    messages.push({ text: messageText, user: authorName, added: new Date(), });
    response.redirect("/");
};

module.exports = { getMessages, getMessageForm, addNewMessage };