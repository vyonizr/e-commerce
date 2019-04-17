const { User } = require("../models")

class CartController {
  static getCart(req, res) {
    User.findById(req.authenticatedUser.id)
    .populate("carts")
    .select("carts")
    .then(foundUser => {
      res.status(200).json(foundUser.carts)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static addToCart(req, res) {
    User.findByIdAndUpdate(req.authenticatedUser.id, {
      $push: {
        carts: req.body.productId
      }
    }, { new: true })
    .populate("carts")
    .select("carts")
    .then(updatedUser => {
      res.status(200).json(updatedUser.carts)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static removeFromCart(req, res) {
    User.findByIdAndUpdate(req.authenticatedUser.id, {
      $pull: {
        carts: req.params.productId
      }
    }, { new: true })
    .populate("carts")
    .select("carts")
    .then(updatedUser => {
      console.log(updatedUser);
      res.status(200).json(updatedUser.carts)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = CartController