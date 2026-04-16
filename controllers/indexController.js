const db = require('../db/queries');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const { body, validationResult, matchedData } = require('express-validator');

// User input validator.
// Error messages.
const authorNameErr = "must be two words, each with at least 3 characters";
const messageHeadingErr = "must be at least two words and form a meaningful title";
const messageDetailsErr = "must be at least 50 characters";

// Form validator functions.
const validateUser = [
	body("authorName").trim().custom(value => {
		const words = value.split(" ").filter(Boolean);
		return words.length === 2 && words.every(word => word.length >= 3);
	}).withMessage(`Author name: ${authorNameErr}`),

	body("messageHeading").trim().custom(value => {
		const words = value.split(" ").filter(Boolean);
		// must have at least 2 words || 3+ words OR total length >= 10 characters
		if (words.length < 2) return false;
		return words.length >= 3 || value.length >= 10;
	}).withMessage(`Message Heading: ${messageHeadingErr}`),

	body("messageDetails").trim().isLength({ min: 50, max: 200 }).withMessage(`Message: ${messageDetailsErr}`),
];

// Date formatter helper function
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

// Get all the messages.
const getMessages = async (request, response) => {
    const messagesInDB = await db.getAllMessages();

    const formattedMessages = messagesInDB.map(message => ({...message, created_at: formatDate(message.created_at)}));
    response.render("index", { messages: formattedMessages });
}

// Deliver a form to create new messages.
const getMessageForm = (request, response) => {
    response.render("form", { errors: [], formData: {} });
};

const addNewMessage = [
    validateUser, 
    async (request, response) => {
        // Handle validation to guide user
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return response.status(400).render("form", { errors: errors.array(), formData: request.body });
        }

        // Proceed to adding message in database
        const { authorName, messageHeading, messageDetails, } = matchedData(request);

        const newMessage = { 
            username: authorName,
            title: messageHeading,
            message: messageDetails,
            created_at: new Date(),
        };

        await db.addNewMessage(newMessage);
        response.redirect("/");
    },
];

// Get a specific message
const getSpecificMessage = async (request, response) => {
    const { messageId } = request.params;

    const message = await db.getSpecificMessage(Number(messageId));
    if (!message) throw new CustomNotFoundError("Requested message not found");
    
    const formattedMessage = { ...message, created_at: formatDate(message.created_at) };
    response.render("message", { message: formattedMessage });
};

const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    await db.deleteMessage(Number(messageId))

    res.redirect("/");
};

module.exports = { getMessages, getMessageForm, addNewMessage, getSpecificMessage, deleteMessage };