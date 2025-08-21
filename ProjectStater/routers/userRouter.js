const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const userRouter = express.Router();

userRouter.get("/", (req, res, next) =>{
    res.sendFile(path.join(rootDir, 'views', 'airbnbHome.html'));
});

module.exports = userRouter;