var express = require("express");
var router = express.Router();
const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'
});

const rekognition = new AWS.Rekognition();

router.post("/classify", async function (req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = [];

  // Your code starts here //
  const imgBuffer = req.files.file.data;

  // passing the image as a buffer
  const imageParams = {
    Image: {
      Bytes: imgBuffer
    },
    MaxLabels: 10
  };

  //function to get labels using aws rekognition
  const identifyLabels = () => {
    //creating a new promise
    return new Promise((resolve, reject) => {
      rekognition.detectLabels(imageParams, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  // try catch block for error handling
  try {
    const data = await identifyLabels()
    data.Labels.map(element => {
      response.push(element.Name)
    })
    res.status(200).json({
      labels: response,
    });
  } catch (err) {
    res.status(400).send("Bad Request");
  }
  // Your code ends here //
});

module.exports = router;
