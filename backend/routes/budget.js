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
        res.send("No expense data exists")
    }
    
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send({ error: e });
  }
});

router.post("/", async (req, res) => {
    // console.log(req)
    console.log(req.body)
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
  module.exports = router;