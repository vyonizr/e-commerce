const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
// const { clearProduct, clearUser } = require("../helpers/")
const { Product, User } = require("../models")
const { jwt } = require("../helpers")

let productId = null
let adminToken = null
let userToken = null

describe("Product Test", function() {
  // BEFORE MAIN TEST
  before(function (done) {
    User.deleteMany({})
    .then(function () {
      return Product.deleteMany({})
    })
    .then(function () {
      return User.create({
        email: "afit@mail.com",
        name: "Fitrahtur Rahman",
        password: "123",
        role: "admin"
      })
    })
    .then(createdAdmin => {
      const token = jwt.sign({
        id: createdAdmin._id,
        email: createdAdmin.email,
        name: createdAdmin.name,
        role: createdAdmin.role
      })

      adminToken = token
      return User.create({
        email: "batu@mail.com",
        name: "Batu Apung",
        password: "123",
      })
    })
    .then(createdUser => {
      const token = jwt.sign({
        id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
        role: createdUser.role
      })

      userToken = token
      done()
    })
    .catch(function (err) {
      console.log(err);
      done()
    })
  });

  after(function (done) {
    User.deleteMany({})
    .then(function () {
      return Product.deleteMany({})
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      console.log(err);
      done()
    })
  });

  // MAIN TEST
  describe("POST /products", function() {
    describe("ON SUCCESS", function() {
      it("should return status 201 and { object product }", function(done) {
        let objProduct = {
          name: "Nicebuoy",
          image: "./image.jpg",
          price: 3000,
          stock: 50
        }

        chai
        .request(app)
        .post("/products")
        .send(objProduct)
        .set("authentication", adminToken)
        .end((err, res) => {
          productId = res.body._id
          expect(err).to.equal(null)
          expect(res).to.have.status(201)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("_id")
          expect(res.body).to.have.property("name")
          expect(res.body).to.have.property("image")
          expect(res.body).to.have.property("price")
          expect(res.body).to.have.property("stock")
          expect(res.body.name).to.be.a("string")
          expect(res.body.image).to.be.a("string")
          expect(res.body.price).to.be.a("number")
          expect(res.body.stock).to.be.a("number")
          expect(res.body.name).to.equal(objProduct.name)
          expect(res.body.image).to.equal(objProduct.image)
          expect(res.body.price).to.equal(objProduct.price)
          expect(res.body.stock).to.equal(objProduct.stock)
          done()
        })
      })
    })

    describe("ON FAIL", function() {
      describe("no input at all", function() {
        describe("authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "",
              price: "",
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("name")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors).to.have.property("stock")
              expect(res.body.errors.name).to.be.a("string")
              expect(res.body.errors.price).to.be.a("string")
              expect(res.body.errors.stock).to.be.a("string")
              done()
            })
          })
        })


        describe("unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "",
              price: "",
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("No name input", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "/image.jpg",
              price: 3000,
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("name")
              expect(res.body.errors.name).to.be.a("string")
              done()
            })
          })
        })

        describe("unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "/image.jpg",
              price: "3000",
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("No price input", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "/image.jpg",
              price: "",
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors.price).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "/image.jpg",
              price: "",
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("No stock input", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "/image.jpg",
              price: 3000,
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("stock")
              expect(res.body.errors.stock).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "/image.jpg",
              price: 3000,
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("No name and price input", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "/image.jpg",
              price: "",
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("name")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors.name).to.be.a("string")
              expect(res.body.errors.price).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "",
              image: "/image.jpg",
              price: "",
              stock: 50
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("No price and stock input", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "/image.jpg",
              price: "",
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors).to.have.property("stock")
              expect(res.body.errors.price).to.be.a("string")
              expect(res.body.errors.stock).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "/image.jpg",
              price: "",
              stock: ""
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("Product price has negative value", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "sabun mandi",
              price: -1000,
              stock: 50,
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors.price).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "sabun mandi",
              price: -1000,
              stock: 50,
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })

      describe("Stock has negative value", function() {
        describe("Authorized state", function() {
          it("should return status 400 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "sabun mandi",
              price: 5000,
              stock: -5,
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", adminToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(400)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("stock")
              expect(res.body.errors.stock).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {
            let objProduct = {
              name: "Nicebuoy",
              image: "sabun mandi",
              price: 5000,
              stock: -5,
            }

            chai
            .request(app)
            .post("/products")
            .set("authentication", userToken)
            .send(objProduct)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })
    })
  })

  describe("GET /products", function(user) {
    describe("ON SUCCESS", function() {
      it("should return status 200 and array of object products", function(done) {
        chai
        .request(app)
        .get("/products")
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("array")
          expect(res.body[0]).to.have.property("name")
          expect(res.body[0]).to.have.property("image")
          expect(res.body[0]).to.have.property("price")
          expect(res.body[0]).to.have.property("stock")
          expect(res.body[0].name).to.be.a("string")
          expect(res.body[0].image).to.be.a("string")
          expect(res.body[0].price).to.be.a("number")
          expect(res.body[0].stock).to.be.a("number")
          done()
        })
      })
    })
  })

  describe("DELETE /products/:productId", function(user) {
    describe("ON SUCCESS", function() {
      it("should return status 200 and { object message }", function(done) {

        chai
        .request(app)
        .delete(`/products/${productId}`)
        .set("authentication", adminToken)
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("message")
          expect(res.body.message).to.be.a("string")
          done()
        })
      })
    })

    describe("ON FAIL", function() {
      describe("Unauthorized Access", function() {
        it("should return status 401 and an object error", function(done) {
          chai
          .request(app)
          .delete(`/products/${productId}`)
          .set("authentication", userToken)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(401)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.have.property("message")
            expect(res.body.errors.message).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid product id", function() {
        describe("Authorized state", function(done) {
          it("should return status 500 and object of { object error }", function(done) {

            chai
            .request(app)
            .delete(`/products/abcdef`)
            .set("authentication", adminToken)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(500)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("message")
              expect(res.body).to.have.property("name")
              expect(res.body).to.have.property("stringValue")
              expect(res.body).to.have.property("kind")
              expect(res.body).to.have.property("value")
              expect(res.body).to.have.property("path")
              expect(res.body.message).to.be.a("string")
              expect(res.body.name).to.be.a("string")
              expect(res.body.stringValue).to.be.a("string")
              expect(res.body.kind).to.be.a("string")
              expect(res.body.value).to.be.a("string")
              expect(res.body.path).to.be.a("string")
              done()
            })
          })
        })

        describe("Unauthorized state", function() {
          it("should return status 401 and object of { object error }", function(done) {

            chai
            .request(app)
            .delete(`/products/abcdef`)
            .set("authentication", userToken)
            .end((err, res) => {
              expect(err).to.equal(null)
              expect(res).to.have.status(401)
              expect(res.body).to.be.an("object")
              expect(res.body).to.have.property("errors")
              expect(res.body.errors).to.have.property("message")
              expect(res.body.errors.message).to.be.a("string")
              done()
            })
          })
        })
      })
    })

  })
})
