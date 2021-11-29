var express = require("express");
var router = express.Router();
var passport = require("passport");
var { signUp, login } = require("./controller/userController");
/* GET users listing. */
router.get(
  "/",
  passport.authenticate("jwt-user", { session: false }),
  function (req, res, next) {
    console.log(req.user);
    res.send("respond with a resource");
  }
);

router.post("/sign-up", signUp);

router.post("/login", login);

module.exports = router;
