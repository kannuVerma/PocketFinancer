const express = require("express");
const app = express();
var cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const configRoutes = require("./routes");

app.use(
  session({
    name: "session",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());
const PORT = 4000;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});