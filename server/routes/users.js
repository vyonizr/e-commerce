const router = require("express").Router()
const { UserController } = require("../controllers/")
const { isAuthenticated } = require("../middlewares/")

router.get("/", isAuthenticated, UserController.getAllUsers)
router.post("/login", UserController.userLogin)
router.post("/register", UserController.userRegister)
router.post("/register/admin", UserController.adminRegister)

module.exports = router