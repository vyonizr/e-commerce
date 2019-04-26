'use strict'
require('dotenv').config()
const {Storage} = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const { Product } = require("../models")

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    Product.findOne({
      _id: req.params.productId,
      createdBy: req.authenticatedUser.id
    })
    .then(foundProduct => {
      if (foundProduct === null) {
        console.log("post with no picture")
        req.file = {
          originalname: 'no_picture',
          cloudStoragePublicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
        }
        next()
      }
      else if (foundProduct.image !== "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png") {
        req.file = {
          cloudStoragePublicUrl: foundProduct.image
        }
        next()
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  else if (req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "image/png") {
    res.status(409).json({
      message: "Only supports .JPG/.JPEG or .PNG file"
    })
  }
  else if (req.file.size > 1048576) {
    res.status(409).json({
      message: "Image size must not be greater than 1 MB"
    })
  }
  else {
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err
      next(err)
    })

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
      })
    })

    stream.end(req.file.buffer)
  }
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
