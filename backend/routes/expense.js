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

  router.patch("/", async (req, res) => {
    const requestBody = req.body;
    let oldExpense = {};
    let updatedExpense = {};
    try {
      oldExpense = await expenseData.getExpenseById(req.body.id);
    }catch (e) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }

    try {
      if(requestBody.date && requestBody.date !== oldExpense.date) {
        updatedExpense.date = requestBody.date;
      }
      if(requestBody.amount && requestBody.amount !== oldExpense.amount) {
        updatedExpense.amount = requestBody.amount;
      }
      if(requestBody.desc && requestBody.desc !== oldExpense.desc) {
        updatedExpense.desc = requestBody.desc;
      }
      if(requestBody.category && requestBody.category !== oldExpense.category) {
        updatedExpense.category = requestBody.category;
      }
      if(!requestBody.date && !requestBody.amount && !requestBody.desc && !requestBody.category) {
        throw `Wrong details provided for updating expense`;
      }
    } catch (e) {
      res.status(400).json({ error: 'Expense details error' });
      return;
    }

    try {
      const updatedExpenseEntry = await expenseData.updatedExpense(req.body.id, updatedExpense);
      res.json(updatedExpenseEntry);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  module.exports = router;