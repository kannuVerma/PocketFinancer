const express = require("express");
const router = express.Router();
const data = require("../data");
const budgetData = data.budget;

router.post("/", async (req, res) => {
    // console.log(req)
    console.log(req.body)
    const budgetPostData = req.body;

    try {
      let {
       date,
       amount,
       category       
      } = budgetPostData;
  

      if (
        date &&
       amount &&
       category
       
      ) {
        try {
          const newbudget = await budgetData.addbudget(
            date,
            amount,
            category
           
          );
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