const router = require("express").Router()
const { images } = require('../helpers/')
const ProductController = require("../controllers/productContoller")
const { isAuthenticated, isAuthorized, isAdmin } =require("../middlewares")

router.get("/", ProductController.getAllProducts)
router.post("/", isAuthenticated, isAdmin, images.multer.single('image'), images.sendUploadToGCS, ProductController.createAProduct)
router.patch("/:productId", isAuthenticated, isAdmin, isAuthorized, images.multer.single('image'), images.sendUploadToGCS, ProductController.updateAProduct)
router.delete("/:productId", isAuthenticated, isAdmin, isAuthorized, ProductController.deleteAProduct)

module.exports = router