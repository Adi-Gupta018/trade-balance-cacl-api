const express = require('express');
const {uploadCSV, getBalanceAtTime} = require('../Controller/userController');
const userRouter = express.Router();

userRouter.get('/',() => {console.log("working");})

userRouter.post('/trades',uploadCSV);
userRouter.post('/balance',getBalanceAtTime);

module.exports = userRouter;