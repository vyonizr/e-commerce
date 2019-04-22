const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
const { Product, User } = require("../models")
const { jwt } = require("../helpers")
chai.use(chaiHttp)

let adminId = null
let productId = null
let userToken = null

describe("Cart test", function() {
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

      adminId = createdAdmin._id
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
      return Product.create({
        name: "Nicebuoy",
        image: "./image.jpg",
        price: 3000,
        stock: 50,
        createdBy: adminId
      })
    })
    .then(createdProduct => {
      productId = createdProduct._id
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
  describe("POST /carts", function() {
    describe("ON SUCCESS", function() {
      it("should return status 200 and array of object of products", function(done) {
        chai
        .request(app)
        .post("/carts/")
        .set("authentication", userToken)
        .send({
          productId
        })
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

    describe("ON FAIL", function() {
      describe("No token provided", function() {
        it("should return status 401 and an array of user's cart", function(done) {
          chai
          .request(app)
          .post("/carts/")
          .send({
            productId
          })
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
        it("should return status 500 and an object error", function(done) {
          chai
          .request(app)
          .post("/carts/")
          .set("authentication", userToken)
          .send({
            productId: "cihuy"
          })
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
    })
  })

  describe("DELETE /carts/:prouctId", function() {
    describe("ON SUCCESS", function () {
      it("should return status 200 and array of users's cart", function(done) {
        chai
        .request(app)
        .delete(`/carts/${productId}`)
        .set("authentication", userToken)
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("array")
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property("name")
            expect(res.body[0]).to.have.property("image")
            expect(res.body[0]).to.have.property("price")
            expect(res.body[0]).to.have.property("stock")
            expect(res.body[0].name).to.be.a("string")
            expect(res.body[0].image).to.be.a("string")
            expect(res.body[0].price).to.be.a("number")
            expect(res.body[0].stock).to.be.a("number")
          }
          done()
        })
      })
    })
  })
})