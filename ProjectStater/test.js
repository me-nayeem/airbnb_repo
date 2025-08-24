const express = require("express");
const app = express();

console.log("test server loaded");

app.use((req, res, next) => {
  console.log("LOGGER:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
