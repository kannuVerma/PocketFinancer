const userRoutes = require("./users");
const loginRoutes = require("./login")
const constructorMethod = (app) => {  
    app.use("/users", userRoutes);  
    app.use("/login", loginRoutes);
    app.use("*", (req, res) => {
      res.status(404).json({ error: "Page not found" });
    });
  };
  
  module.exports = constructorMethod;