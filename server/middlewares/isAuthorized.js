const { Product } = require("../models")

module.exports = function isAuthorized(req, res, next) {
  Product.findById(req.params.productId)
  .populate({
    path: "createdBy",
    select: "_id"
  })
  .then(foundProduct => {
    if (foundProduct === null) {
      res.status(404).json({
        errors: {
          message: "Product not found."
        }
      })
    }
    else if (foundProduct.createdBy._id != req.authenticatedUser.id) {
      res.status(401).json({
        errors: {
          message: "You are not authorized to perform this action."
        }
      })
    }
    else {
      next()
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
}