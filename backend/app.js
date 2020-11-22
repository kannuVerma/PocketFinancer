const express = require("express");
const app = express();
var cors = require('cors')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const configRoutes = require("./routes");
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(
  session({
    name: "session",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
  })
);
const options = {
  target: 'http://localhost:3000', // target host
  changeOrigin: true
}

//const exampleProxy = createProxyMiddleware("**", options)
//app.use("/",exampleProxy);
app.use(cookieParser());
const PORT = 4000;
app.use(cors());
app.use(express.json());
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});*/
 app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});