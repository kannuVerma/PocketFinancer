const express = require("express");
const router = express.Router();

// created this thinking we might need this while handling session
router.get("/", async (req, res) => {
//   if (req.session.user) {
//     req.session.destroy();
//     res.render("users/logout", { logged_in: false });
//   } else {
    res.status(200).send({ msg: "Logged out" });
//   }
});
module.exports = router;
