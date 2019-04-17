const { jwt } = require("../helpers")
const { User } = require("../models")

module.exports = function isAuthenticated(req, res, next) {
  if (req.headers.authentication) {
    const decodedToken = jwt.verify(req.headers.authentication)
    User.findById(decodedToken.id)
    .then(foundUser => {
      if (foundUser) {
        req.authenticatedUser = decodedToken
        next()
      }
      else {
        res.status(404).json({
          errors: {
            message: "User not found"
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  else {
    res.status(401).json({
      errors: {
        message: "You are not authenticated. Please login."
      }
    })
  }
}