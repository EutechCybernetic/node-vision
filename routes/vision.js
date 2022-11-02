var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const client = new AWS.Rekognition();

router.post("/classify", async function (req, res, next) {
  const params = {
    Image: {
      Bytes: req.files.file.data,
    },
    MaxLabels: 10,
  };

  try {
    const response = await client.detectLabels(params).promise();

    let arr = { labels: [] };

    for (let index = 0; index < response.Labels.length; index++) {
      arr.labels[index] = response.Labels[index].Name;
    }

    res.json(arr);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
