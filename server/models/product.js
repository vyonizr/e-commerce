const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name should not be empty"]
  },
  image: {
    type: String,
    required: [true, "Product URL should not be empty"]
  },
  price: {
    type: Number,
    required: [true, "Product price should not be empty"],
    validate: {
      validator: function(price) {
        if (price < 0) {
          return false
        }
      },
      message: "Price should not have a negative value"
    }
  },
  stock: {
    type: Number,
    required: [true, "Product stock should not be empty"],
    validate: {
      validator: function(number) {
        if (number < 0) {
          return false
        }
      },
      message: "Stock should not have a negative value"
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product