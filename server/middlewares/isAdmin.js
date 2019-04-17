const { User } = require("../models")

module.exports = function isAuthenticated(req, res, next) {
  User.findById(req.authenticatedUser.id)
  .then(foundUser => {
    if (foundUser.role !== "admin") {
      res.status(401).json({
        errors: {
          message: "Please login as admin to perform this action."
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