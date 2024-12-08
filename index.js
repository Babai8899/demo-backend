import express, { json } from 'express';
import pkg from 'mongoose';
const { connect, connection } = pkg;
const app = express();

import cors from 'cors';

app.use(cors());

const corsOptions = {
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  };
  
  app.use(cors(corsOptions));

// import convoRoutes from './routes/convoRoutes.js';
import userRoutes from './routes/userRoutes.js';

const db_password = process.env.MONGODB_PASSWORD;
const mongodburl = 'mongodb+srv://indrababai9898:' + db_password + '@learningcluster.4ngkm.mongodb.net/convomodel';

const url = mongodburl; // Replace with your MongoDB connection URL
connect(url);

app.use(json());

try {
    connection.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

const port = 8001;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

// app.use('/convo', convoRoutes);
app.use('/user', userRoutes);