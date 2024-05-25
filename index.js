const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const userRouter = require('./Routes/userRouter');


const app = express();
const port = 3000;

app.use(express.json());
app.use('',userRouter);

try {
    connectDB();
    app.listen(port,() => {
        console.log(`server is running on ${port}`);
    })
} catch (error) {
    console.error(error);
}