const express = require('express');
const {uploadCSV, getBalanceAtTime, getAll} = require('../Controller/userController');
const userRouter = express.Router();

userRouter.get('/test',() => {console.log("working");})

userRouter.post('/trades',uploadCSV);
userRouter.post('/balance',getBalanceAtTime);
userRouter.get('/trades',getAll);

module.exports = userRouter;