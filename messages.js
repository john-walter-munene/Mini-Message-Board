let messageIdentifier = 0;

const messages = [
    {   
        user: "John Walter",
        textHeading: "Technical Writer",
        textDetails: "A technical writer is someone who helps others understand technology by writing it out in simple terms.",
        added: new Date(),
        textId: getNextMessageId(),

    },
    {   
        user: "Munene Njeru",
        textHeading: "Web Developer",
        textDetails: "A web developer is one who writes code either in JavaScript or C# on the frontend, and any other backend scripting language on \
            to create functional web sites and applications",
        added: new Date(),
        textId: getNextMessageId(),
    },
];

// Small helper to only update & return the next ID
function getNextMessageId() {
    messageIdentifier += 1;
    return messageIdentifier;
}

function setMessageIdentifier(value) {
    messageIdentifier = value;
}

module.exports = { messages, getNextMessageId, setMessageIdentifier, messageIdentifier };