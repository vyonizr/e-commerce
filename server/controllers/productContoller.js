const { Product } = require("../models")
const ObjectId = require('mongodb').ObjectID

class ProductController {
  static getAllProducts(req, res) {
    Product.find({})
    .then(products => {
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static createAProduct(req, res) {
    console.log(req.file, "<= req.file");
    Product.create({
      name: req.body.name,
      image: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock
    })
    .then(createdProduct => {
      res.status(201).json(createdProduct)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.name) {
          objError.name = err.errors.name.message
        }
        if (err.errors.description) {
          objError.description = err.errors.description.message
        }
        if (err.errors.price) {
          objError.price = err.errors.price.message
        }
        if (err.errors.stock) {
          objError.stock = err.errors.stock.message
        }
        res.status(400).json({
          errors: objError
        })
      }
      else {
        res.status(500).json(err)
      }
    })
  }

  static deleteAProduct(req, res) {
    Product.deleteOne({
      _id: req.params.productId
    })
    .then(() => {
      res.status(200).json({
        message: "delete success"
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = ProductController