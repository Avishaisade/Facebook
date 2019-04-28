const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// db connection
mongoose.connect("mongodb://localhost:27017/FB-Project", { useNewUrlParser: true });

// routes requirement
const users = require('./src/users/users.routes');

const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(logger('dev'));
app.use("/users", (req, res, next) => {
    console.log(`users have been called on: ${new Date()}`);
    next();
});

// routes
app.use(users.route);

// serve
app.listen(8080);