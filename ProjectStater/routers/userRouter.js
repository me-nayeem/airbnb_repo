//installed module
const express = require("express");
const Controller = require("../controller/homes");

const userRouter = express.Router();

userRouter.get("/", Controller.getHome);

module.exports = userRouter;
