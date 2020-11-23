const express = require("express");
const router = express.Router();
const data = require("../data");
const budgetData = data.budget;
const userData = data.users;


router.get("/:id", async (req, res) => {
  try {
    const budgetList = await budgetData.getUserAllBudgets(req.params.id);
    
    if(budgetList){
      res.json(budgetList);
    }else{
        res.send("No Budget data exists")
    }
    
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send({ error: e });
  }
});
router.get("/budget/:id", async (req, res) => {
  try {
    const budget = await budgetData.getBudgetById(req.params.id);
    if(budget){
      res.json(budget);
    }else{
        res.send("No budget data exists")
    }
    
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send({ error: e });
  }
});

router.post("/", async (req, res) => {
    const budgetPostData = req.body;

    try {
      let {
       amount,
       category,
       userId    
      } = budgetPostData;
  

      if (
       amount &&
       category &&
       userId
        
      ) {
        try {
          const newbudget = await budgetData.addBudget(
            amount,
            category    
          );
          await userData.addBudgetToUser(userId, String(newbudget._id));
          res.json(newbudget);
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
      const budgetList = await budgetData.deleteBudget(req.body.userId, req.body.budgetId);
      if(budgetList){
        res.json(budgetList);
      }else{
          res.send("No Budget data exists")
      }
      
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send({ error: e });
    }
  });

  router.patch("/", async (req, res) => {
    const requestBody = req.body;
    let oldBudget = {};
    let updatedBudget = {};
    try {
      oldBudget = await budgetData.getBudgetById(req.body.id);
    }catch (e) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }

    try {
      if(requestBody.amount && requestBody.amount !== oldBudget.amount) {
        updatedBudget.amount = requestBody.amount;
      }
      if(requestBody.category && requestBody.category !== oldBudget.category) {
        updatedBudget.category = requestBody.category;
      }
      if(!requestBody.amount && !requestBody.category) {
        throw `Wrong details provided for updating budget`;
      }
    } catch (e) {
      res.status(400).json({ error: 'Budget details error' });
      return;
    }

    try {
      const updatedBudgetEntry = await budgetData.updatedBudget(req.body.id, updatedBudget);
      res.json(updatedBudgetEntry);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  module.exports = router;