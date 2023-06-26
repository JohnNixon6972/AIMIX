const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const techGPT = require("./openai");

require("dotenv").config();

var corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tech", techGPT);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started and running on PORT :", port);
});
