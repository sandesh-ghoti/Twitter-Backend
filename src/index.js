const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/serverConfig");
const Logger = require("./config/loggerConfig");
const dbConfig = require("./config/dbConfig");
const apiRouter = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log("listening on port: ", PORT);
  try {
    await dbConfig();
    console.log("connected to mongodb");
    Logger.info("successfully started server", "root", {});
  } catch (e) {
    console.log(e);
    Logger.error("not able to connect with db", "root", {});
    process.exit(1);
  }
});
