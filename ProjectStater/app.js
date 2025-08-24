const path = require("path");
const express = require("express");
const rootDir = require("./util/path");
const userRouter = require("./routers/userRouter");
const { hostRouter } = require("./routers/hostRouter");
const Controller = require("./controller/homes");
const ErrorController = require("./controller/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join("./public"))); // accessing the public forderr to add css on html

app.use(userRouter);
app.use(hostRouter);

app.use(ErrorController.page404);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
