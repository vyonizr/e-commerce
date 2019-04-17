const { User } = require("../models")
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const { bcrypt, jwt } = require("../helpers")

class UserController {
  static getAllUsers(req, res) {
    User.find({
      email: {
        $ne: req.authenticatedUser.email
      }
    }, "_id name")
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static userLogin(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then(foundUser => {
      if (!foundUser) {
        res.status(401).json({
          errors: {
            password:"Wrong username/password"
          }
        })
      }
      else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = jwt.sign({
          id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        })

        res.status(200).json({
          token,
          id: foundUser._id,
          name: foundUser.name,
          role: foundUser.role
        })
      }
      else {
        res.status(401).json({
          errors: {
            password:"Wrong username/password"
          }
        })
      }
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.email) {
          objError.email = err.errors.email.message
        }
        if (err.errors.password) {
          objError.password = err.errors.password.message
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

  static userRegister(req, res) {
    User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    .then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.email) {
          objError.email = err.errors.email.message
        }
        if (err.errors.name) {
          objError.name = err.errors.name.message
        }
        if (err.errors.password) {
          objError.password = err.errors.password.message
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

  static adminRegister(req, res) {
    User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: "admin"
    })
    .then(createdAdmin => {
      res.status(201).json(createdAdmin)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.email) {
          objError.email = err.errors.email.message
        }
        if (err.errors.name) {
          objError.name = err.errors.name.message
        }
        if (err.errors.password) {
          objError.password = err.errors.password.message
        }
        if (err.errors.role) {
          objError.password = err.errors.role.message
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

  static addAProductToUser(req, res) {
    User.findById
  }
}

module.exports = UserController