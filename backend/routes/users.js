const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

  router.get("/:id", async (req, res) => {
    try {
      const user = await userData.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(404).json({ error: "User not found" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const userList = await userData.getAllUsers();
      res.json(userList);
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send({ error: e });
    }
  });
  

  router.post("/", async (req, res) => {
    const userPostData = req.body;

    try {
      let {
        firstName,
        lastName,
        email,
        password
        
      } = userPostData;
  

      if (
        firstName &&
        lastName &&
        email &&
        password
       
      ) {
        try {
          const newUser = await userData.addUser(
            firstName,
            lastName,
            email,
            password
           
          );
          res.json(newUser);
        } catch (e) {
          console.log(e);        
            res.status(403).send({ statusText: "Email already exist" });                    
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