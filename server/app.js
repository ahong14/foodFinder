const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

//mongo connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI_LOCAL, { useNewUrlParser: true} );
mongoose.connection.on('error', (error) => {
    console.error('Database connection error:', error);
});

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
const items = require('./routes/items');
const authMiddleware = require('./routes/authMiddleware');

app.use('/api/auth', auth);
app.use('/api/search', search);
app.use(authMiddleware);
app.use('/api/items', items);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
    console.log("Started on port: ", process.env.PORT);
})