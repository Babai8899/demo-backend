const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/UserRoutes.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use('/user',UserRoute)