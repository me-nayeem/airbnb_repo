const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const hostRouter = express.Router();


hostRouter.get("/set-home", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'addHome.html'));
});

hostRouter.post("/set-home", (req, res, next) => {
  console.log(req.body);
    res.sendFile(path.join(rootDir,  'views', 'addedHome.html'));
});

module.exports = hostRouter;

