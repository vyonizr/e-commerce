const router = require("express").Router()
const { images } = require('../helpers/')
const ProductController = require("../controllers/productContoller")
const { isAuthenticated, isAuthorized } =require("../middlewares")

router.get("/", ProductController.getAllProducts)
router.post("/", isAuthenticated, isAuthorized, images.multer.single('image'), images.sendUploadToGCS, ProductController.createAProduct)
router.delete("/:productId", isAuthenticated, isAuthorized, ProductController.deleteAProduct)

module.exports = router