const express = require("express");
const app = express();
const PORT = 5000;

const logger = (req, res, next) => {
  const url = req.url;
  const method = req.method;
  const time = new Date().getFullYear()
  console.log(method, url, time);
  next();
};
app.get("/", logger, (req,res) => {
  res.status(200).send("hello");
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
