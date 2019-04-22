const router = require("express").Router()
const { CartController } = require("../controllers/")
const { isAuthenticated } = require("../middlewares/")


router.get("/", isAuthenticated, CartController.getCart)
router.post("/", isAuthenticated, CartController.addToCart)
router.delete("/:productId", isAuthenticated, CartController.removeFromCart)

module.exports = router