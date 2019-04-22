const { Product, User } = require("../models")
const ObjectId = require('mongodb').ObjectID

class ProductController {
  static getAllProducts(req, res) {
    if(req.query.productId) {
      Product.findById(req.query.productId)
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
    else {
      Product.find({})
      .populate({
        path: "createdBy",
        select: "name"
      })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  }

  static createAProduct(req, res) {
    Product.create({
      name: req.body.name,
      image: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock,
      createdBy: req.authenticatedUser.id
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
        if (err.errors.image) {
          objError.description = err.errors.image.message
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
    User.update({}, {
      $pull: {
        carts: {
          _id: req.params.productId
        }
      }
    })
    .then(() => {
      return Product.deleteOne({
        _id: req.params.productId
      })
    })
    .then(() => {
      res.status(200).json({
        message: "delete success"
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static updateAProduct(req, res) {
    Product.findByIdAndUpdate(req.params.productId, {
      name: req.body.name,
      image: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock
    }, { new: true })
    .then(updatedProduct => {
      res.status(200).json(updatedProduct)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.name) {
          objError.name = err.errors.name.message
        }
        if (err.errors.image) {
          objError.description = err.errors.image.message
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
        console.log(err);
        res.status(500).json(err)
      }
    })
  }
}

module.exports = ProductController

/*
User.update({},
{$pull : { "carts" : {"_id": req.params.productId} } } )
https://stackoverflow.com/questions/22065314/remove-a-subdocument-nested-in-an-array-in-mongodb
*/