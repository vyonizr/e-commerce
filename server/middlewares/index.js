const isAuthenticated = require("./isAuthenticated")
const isAuthorized = require("./isAuthorized")
const isAdmin = require("./isAdmin")

module.exports = {
  isAdmin,
  isAuthenticated,
  isAuthorized
}