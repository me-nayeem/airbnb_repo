// External module
const express = require("express");

//local module
const Controller = require("../controller/homes");
const houses = require("../util/data");

const hostRouter = express.Router();

// below handling all the http request from client

hostRouter.get("/set-home", Controller.setHome);

hostRouter.post("/set-home", Controller.postHome);

hostRouter.get("/houses/:name", Controller.getHouseDetails);

hostRouter.post("/book/:name", Controller.postBookingHomes);

hostRouter.get("/suggest-edit/:name", Controller.getSuggestPage);

hostRouter.post("/suggest-edit/:name", Controller.postSuggestPage);

hostRouter.get("/create-account", Controller.showCreateAccountPage);

hostRouter.post("/create-account", Controller.showCreateAccountStatus);

hostRouter.get("/login", Controller.showLoginPage);

hostRouter.post("/login", Controller.showLoginStatus);

exports.hostRouter = hostRouter;
