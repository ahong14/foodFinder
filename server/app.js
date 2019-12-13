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
//serve index.html for react
app.use(express.static(path.join(__dirname, '/../client/build')));


//route setup
const search = require('./routes/search');
const auth = require('./routes/auth');

app.use('/api/search', search);
app.use('/api/auth', auth);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

const PORT = 4000;
app.listen(process.env.PORT || PORT, () => {
    console.log("Started on port: ", process.env.PORT);
})