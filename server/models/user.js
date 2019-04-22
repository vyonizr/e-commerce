const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email cannot be empty"],
    validate: [{
      validator: function isUnique(email) {
        return User.findOne({
          email
        })
        .then(foundUser => {
          if (foundUser) {
            return false
          }
        })
      },
      message: "Email is already registered"
    }, {
      validator: function isEmail(email) {
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexEmail.test(email)
      },
      message: "Email must be in a valid format"
    }]
  },
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    validate: [{
      validator: function isAlpha(name) {
        let alphaRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        return alphaRegex.test(name)
      },
      message: "Your name must be in a valid format"
    }]
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"]
  },
  role: {
    type: String,
    default: "user"
  },
  carts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
})

userSchema.pre("save", function(next) {
  let user = this

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);

  user.password = hash
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User