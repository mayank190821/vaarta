const { SetAvatar } = require("../../client/src/pages/setAvatar");
const { register, login } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar",SetAvatar)

module.exports = router;