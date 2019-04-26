require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 80
const routes = require("./routes")

mongoose.set('useFindAndModify', false);

// FOR TESTING
// mongoose.connect("mongodb://localhost:27017/ecommerce-" + process.env.NODE_ENV, { useNewUrlParser: true })

// LOCAL MONGODB
// mongoose.connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true })

// MONGODB ATLAS
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@divenire-1se8t.gcp.mongodb.net/ecommerce`, { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).send("Connected!")
})

app.use("/", routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app