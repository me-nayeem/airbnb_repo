// installed module
const express = require("express");

//core module
const path = require("path");

//local module
const rootDir = require("../util/path");


const hostRouter = express.Router();


hostRouter.get("/set-home", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
});

const houses = [];
hostRouter.post("/set-home", (req, res, next) => {
  console.log(req.body, req.body.houseName);
    res.sendFile(path.join(rootDir,  'views', 'addedHome.html'));
    houses.push({houseName: req.body.houseName});
});

exports.hostRouter = hostRouter;
exports.houses = houses;

