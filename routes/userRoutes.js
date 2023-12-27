const { Router } = require("express");
const { check } = require("express-validator");

const {
  userLogin,
  userRegister,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/verifyToken");

const router = Router();

router.post(
  "/register",
  [check("username").notEmpty().withMessage("Please enter a username")],
  userRegister
);

router.post("/login", userLogin);

router.get("/current", validateToken, currentUser);

module.exports = router;
