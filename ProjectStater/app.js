const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const userRouter = require("./routers/userRouter");
const { hostRouter } = require("./routers/hostRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req,res,next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded({extended:true}));
app.use(userRouter);
app.use(hostRouter);
app.use(express.static(path.join(rootDir, "public")));// accessing the public forderr to add css on html
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const port = 3000;
app.listen(port, ()=> {
  console.log(`server is running http://localhost:${port}`)
});