const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

//express setup
const app = express();
//parse body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//parse cookies
app.use(cookieParser());
//debug requests
app.use(morgan('combined'));

//route setup
const search = require('./routes/search');
app.use('/api/search', search);
app.get('/', (req, res) => {
    return res.status(200).send("test");
})

const PORT = 4000;
app.listen(process.env.PORT || PORT, () => {
    console.log("Started on port: ", process.env.PORT);
})