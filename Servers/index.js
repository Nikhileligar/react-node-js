const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/route.js');
const app = express();

app.use(bodyParser.json({limit:'30mb' , extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb' , extended: true}));
app.use('/posts', postRouter);

const DB_URL = 'mongodb+srv://newUser:newUser@cluster01.swn9b4m.mongodb.net/';
mongoose.connect(DB_URL).then(() => {app.listen(3000,() => {
    console.log('connected to mongodb and server is running success on port 3000')
    });
}).catch((err) => {
    console.log(err,'error in connection with db');
});