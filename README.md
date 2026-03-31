# Mini Message Board

## Overview
A simple **full-stack web application** built with **Node.js**, **Express**, and **EJS** that allows users to post messages and view them on a message board. This project demonstrates **server-side rendering**, basic routing, and handling form submissions in Express.

## Features
- View all messages on the index page (`/`)
- Add a new message through a form (`/new`) using POST requests
- Display message details including author, text, and timestamp
- Open individual messages on a separate page (using dynamic route parameters)
- Delete specific message and reroute back to main page.
- Server-side date formatting for a user-friendly display (East African Time)

## Concepts Demonstrated
- Express routing (`GET` and `POST`)
- Controllers following **MVC pattern**
- Server-side templates with **EJS**
- Handling form data with `express.urlencoded()`
- Mapping and transforming arrays of objects (messages)
- Post/Redirect/Get pattern for form submissions
- Dynamic route parameters for individual message pages