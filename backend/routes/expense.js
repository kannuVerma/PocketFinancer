const express = require("express");
const router = express.Router();
const data = require("../data");
const expenseData = data.expense;
const userData = data.users;

router.get("/:id", async (req, res) => {
    try {
      const expenseList = await expenseData.getUserAllExpenses(req.params.id);
      if(expenseList){
        res.json(expenseList);
      }else{
          res.send("No expense data exists")
      }
      
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send({ error: e });
    }
  });
  router.get("/expense/:id", async (req, res) => {
    try {
      const expense = await expenseData.getExpenseById(req.params.id);
      if(expense){
        res.json(expense);
      }else{
          res.send("No expense data exists")
      }
      
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send({ error: e });
    }
  });


router.post("/", async (req, res) => {
    const expensePostData = req.body;

    try {
      let {
       date,
       amount,
       desc,
       category,
       userId
       
        
      } = expensePostData;

      if (
        date &&
       amount &&
       desc &&
       category &&
       userId
       
      ) {
        try {
          const newExpense = await expenseData.addExpense(
            date,
            amount,
            desc,
            category
          );

        await userData.addExpenseToUser(userId, String(newExpense._id));
          res.json(newExpense);
        } catch (e) {
          console.log(e);        
            res.status(400).send({ statusText: "Could not update database" });                    
        }
      } else {
        res.status(400).send({ error: "Bad Request" });
      }
    } catch (e) {
      res.status(500).send({ error: e });
      console.log(e);
    }
  });

  router.delete("/", async (req, res) => {
    try {
      console.log(req.body, "jay")
      const expenseList = await expenseData.deleteExpense(req.body.userId, req.body.expenseId);
      if(expenseList){
        res.json(expenseList);
      }else{
          res.send("No expense data exists")
      }
      
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send({ error: e });
    }
  });

  module.exports = router;