const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const { User } = require("../models/")

before(function(done) {
  User
  .deleteMany({})
  .then(() => {
  })
  .catch(err => {
    console.log(err);
  });
  done()
});

after(function(done) {
  User
  .deleteMany({})
  .then(() => {
  })
  .catch(err => {
    console.log(err);
  });
  done()
});

describe("User Test", function() {
  describe("POST /users/register", function() {
    describe("ON SUCCESS", function() {
      it("should return status 201 and { object user }", function(done) {
        const objUser = {
          email: "batu@mail.com",
          name: "Batu Apung",
          password: "123",
        }

        chai
        .request(app)
        .post("/users/register")
        .send(objUser)
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(201)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("_id")
          expect(res.body).to.have.property("email")
          expect(res.body).to.have.property("name")
          expect(res.body).to.have.property("password")
          expect(res.body).to.have.property("role")
          expect(res.body).to.have.property("carts")
          expect(res.body._id).to.be.a("string")
          expect(res.body.email).to.be.a("string")
          expect(res.body.name).to.be.a("string")
          expect(res.body.password).to.be.a("string")
          expect(res.body.role).to.be.a("string")
          expect(res.body.carts).to.be.an("array")
          done()
        })
      })
    })

    describe("ON FAIL", function() {
      describe("Email is already registered", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "batu@mail.com",
            name: "Batu Apung",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors.email).to.be.a("string")
            done()
          })
        })
      })

      describe("No input at all", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "",
            name: "",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("No Email input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "",
            name: "Cuka Apel",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors.email).to.be.a("string")
            done()
          })
        })
      })

      describe("No name input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cuka@mail.com",
            name: "",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors.name).to.be.a("string")
            done()
          })
        })
      })

      describe("No password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cuka@mail.com",
            name: "Cuka Apel",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("No email and name input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "",
            name: "",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            done()
          })
        })
      })

      describe("No email and password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "",
            name: "Cuka Apel",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })
      describe("No name and password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cuka@mail.com",
            name: "",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid email input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cukamail",
            name: "Cuka Apel",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors.email).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid name input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cuka@mail.com",
            name: "Cuk4 @p3l",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors.name).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid email and name input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cukamail",
            name: "Cuk4 @p3l",
            password: "123",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid email, empty name and empty password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cukamail",
            name: "",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("Empty email, invalid name and empty password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "",
            name: "Cuk4 @p3l",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("Invalid email, invalid name and empty password input", function() {
        it("should return status 400 and { object error }", function(done) {
          const objUser = {
            email: "cukamail",
            name: "Cuk4 @p3l",
            password: "",
          }

          chai
          .request(app)
          .post("/users/register")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("name")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.name).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })
    })
  })


  describe("POST /users/login ", function() {
    describe("ON SUCCESS", function() {
      it("should return status 200 and { object token }", function(done) {
        let objUser = {
          email: "batu@mail.com",
          password: "123"
        }

        chai
        .request(app)
        .post("/users/login")
        .send(objUser)
        .end((err, res) => {
          expect(err).to.equal(null)
          expect(res).to.have.status(200)
          expect(res.body).to.have.property("token")
          expect(res.body).to.have.property("id")
          expect(res.body).to.have.property("name")
          expect(res.body.token).to.be.a("string")
          expect(res.body.id).to.be.a("string")
          expect(res.body.name).to.be.a("string")
          done()
        })
      })
    })

    describe("ON FAIL", function() {
      describe("No input at all", function() {
        it("should return status 400 and { object error }", function(done) {
          let objUser = {
            email: "",
            password: ""
          }

          chai
          .request(app)
          .post("/users/login")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })

      describe("Wrong username/password", function() {
        it("should return status 401 and { object error }", function(done) {
          let objUser = {
            email: "batu@mail.com",
            password: "1"
          }

          chai
          .request(app)
          .post("/users/login")
          .send(objUser)
          .end((err, res) => {
            expect(err).to.equal(null)
            expect(res).to.have.status(401)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("object")
            expect(res.body.errors).to.have.property("email")
            expect(res.body.errors).to.have.property("password")
            expect(res.body.errors.email).to.be.a("string")
            expect(res.body.errors.password).to.be.a("string")
            done()
          })
        })
      })
    })
  })
})