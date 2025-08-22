//installed module
const express = require("express");

//core module
const path = require("path");

//local module
const rootDir = require("../util/path");
const { houses } = require("./hostRouter");


const userRouter = express.Router();

userRouter.get("/", (req, res, next) =>{
    console.log(houses);
    res.render('airbnbHome', {houses: houses});
});

module.exports = userRouter;