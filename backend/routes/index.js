const singupRoutes = require("./users");
const loginRoutes = require("./login")
const expenseRoutes = require("./expense")
const budgetRoutes = require("./budget")
const constructorMethod = (app) => {  
    app.use("/signup", singupRoutes);  
    app.use("/login", loginRoutes);
    app.use("/expense", expenseRoutes);
    app.use("/budget", budgetRoutes);
    app.use("*", (req, res) => {
      res.status(404).json({ error: "Page not found" });
    });
  };
  
  module.exports = constructorMethod;