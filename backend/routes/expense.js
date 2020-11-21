const express = require("express");
const router = express.Router();
const data = require("../data");
const expenseData = data.expense;

router.post("/", async (req, res) => {
    // console.log(req)
    console.log(req.body)
    const expensePostData = req.body;

    try {
      let {
       date,
       amount,
       desc,
       category

        
      } = expensePostData;
  

      if (
        date &&
       amount &&
       desc &&
       category
       
      ) {
        try {
          const newExpense = await expenseData.addExpense(
            date,
            amount,
            desc,
            category
           
          );
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
  module.exports = router;