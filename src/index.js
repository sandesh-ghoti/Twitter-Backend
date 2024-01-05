const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/serverConfig");
const dbConfig = require("./config/dbConfig");
const apiRouter=require('./routers')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.use('api',)
app.listen(PORT, async () => {
  console.log("listening on port: ", PORT);
  try {
    await dbConfig();
    console.log("connected to mongodb");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
