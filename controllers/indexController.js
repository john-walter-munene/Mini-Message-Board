const { messages, messageIdentifier, getNextMessageId, setMessageIdentifier } = require('../messages');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

// Get all the messages.
const getMessages = (request, response) => {
    const messagesInDB = [...messages];

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
    const { authorName, messageHeading, messageDetails, } = request.body;

    const newMessage = {
        user: authorName?.trim() || "Anonymous",
        textHeading: messageHeading?.trim() || "No Title",
        textDetails: messageDetails?.trim() || "",
        added: new Date(),
        textId: getNextMessageId(),
    };

    messages.push(newMessage);
    response.redirect("/");
};

// Get a specific message
const getSpecificMessage = async (request, response) => {
    const { messageId } = request.params;
    const id = Number(messageId);
    
    const message = messages.find(message => message.textId === id);

    if (!message) throw new CustomNotFoundError("Requested message not found");
    
    const formattedMessage = { ...message, added: formatDate(message.added) };

    response.render("message", { message: formattedMessage });
};

const deleteMessage = (req, res) => {
    const { messageId } = req.params;
    const id = Number(messageId);

    const index = messages.findIndex(msg => msg.textId === id);

    if (index === -1) throw new CustomNotFoundError ("Message not found");

    // Remove the message, 
    // Remap textIds to remain incremental starting from 1
    // Reset the global messageIdentifier
    messages.splice(index, 1);
    messages.forEach((msg, idx) => msg.textId = idx + 1);
    setMessageIdentifier();

    res.redirect("/");
};

module.exports = { getMessages, getMessageForm, addNewMessage, getSpecificMessage, deleteMessage };