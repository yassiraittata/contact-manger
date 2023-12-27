const { Router } = require("express");
const { check } = require("express-validator");
const validateToken = require("../middlewares/verifyToken");

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = Router();

router.use(validateToken);
router
  .route("/")
  .get(getContacts)
  .post(
    [check("email").isEmail().withMessage("Incorrect format of email")],
    createContact
  );

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
