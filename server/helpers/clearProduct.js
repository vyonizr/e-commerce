const { Product } = require("../models");

module.exports = function(done) {
  if (process.env.NODE_ENV === "test") {
    Product
    .deleteMany({})
    .then(function() {
      done();
    })
    .catch(function(err) {
      console.log(err);
    });
  }
};