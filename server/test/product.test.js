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

describe.only("Product Test", function() {
  // BEFORE MAIN TEST
  before(function() {
    Product.deleteMany({})
    .then(() => {
      return User.deleteMany({})
    })
    .then(() => {
      return User.create({
        email: "afit@mail.com",
        name: "Fitrahtur Rahman",
        password: "123",
      })
    })
    .then(createdUser => {
      adminToken = jwt.sign({
        id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
        role: "administrator"
      })

      return User.create({
        email: "vue@mail.com",
        name: "Vue",
        password: "123",
      })
    })
    .then(createdUser => {
      userToken = jwt.sign({
        id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name
      })
    })
    .catch(err => {
      console.log(err);
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
        .set("authentication", adminToken)
        .post("/products")
        .send(objProduct)
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
              expect(res.body.errors).to.have.property("image")
              expect(res.body.errors).to.have.property("price")
              expect(res.body.errors).to.have.property("stock")
              expect(res.body.errors.name).to.be.a("string")
              expect(res.body.errors.image).to.be.a("string")
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
        it("should return status 400 and object of { object error }", function(done) {
          let objProduct = {
            name: "",
            image: "sabun mandi",
            price: 3000,
            stock: 50
          }

          chai
          .request(app)
          .set("authentication", adminToken)
          .post("/products")
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

      describe("No image input", function() {
        it("should return status 400 and object of { object error }", function(done) {
          let objProduct = {
            name: "Nicebuoy",
            image: "",
            price: 3000,
            stock: 50
          }

          chai
          .request(app)
          .set("authentication", adminToken)
          .post("/products")
          .send(objProduct)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.have.property("image")
            expect(res.body.errors.image).to.be.a("string")
            done()
          })
        })
      })

      describe("No price input", function() {
        it("should return status 400 and object of { object error }", function(done) {
          let objProduct = {
            name: "Nicebuoy",
            image: "sabun mandi",
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

      describe("No stock input", function() {
        it("should return status 400 and object of { object error }", function(done) {
          let objProduct = {
            name: "Nicebuoy",
            image: "sabun mandi",
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

      describe("No name & image input", function() {
        it("should return status 400 and object of { object error }", function(done) {
          let objProduct = {
            name: "",
            image: "",
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
            expect(res.body.errors).to.have.property("image")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.image).to.be.a("string")
            done()
          })
        })
      })

      describe("Product price has negative value", function() {
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

      describe("Stock has negative value", function() {
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
            console.log(res.body);
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
      it("should return status 200 and array of object products", function(done) {
        chai
        .request(app)
        .get("/products")
        .set("authentication", adminToken)
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("array")
          expect(res.body[0].name).to.be.a("string")
          expect(res.body[0].image).to.be.a("string")
          expect(res.body[0].price).to.be.a("number")
          expect(res.body[0].stock).to.be.a("number")
          done()
        })
      })
    })

    describe("ON FAIL (User)", function() {
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
    })

  })
})
