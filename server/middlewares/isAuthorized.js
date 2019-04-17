module.exports = function isAuthorized(req, res, next) {
  try {
    if (req.authenticatedUser.role !== "administrator") {
      throw ({
        errors: {
          message: "You are not authorized to perform this action."
        }
      });
    }
    else {
      next()
    }
  }
  catch (err) {
    res.status(401).json(err)
  }
}