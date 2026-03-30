require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');

// Templating engine.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static assets.
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Parse to access body content in post requests
app.use(express.urlencoded({ extended: true }));

// Routes to be used
const indexRouter = require('./routes/indexRouter');

app.use("/", indexRouter);

// Error handler
app.use((error, request, response, next) => {
    console.log(error);
    response.status(error.statusCode).send(error.message);
})

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`My Express app - listening on port ${PORT}`);
});