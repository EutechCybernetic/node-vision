var express = require('express');
var aws = require('aws-sdk');
var router = express.Router();

router.post('/classify', function (req, res, next) {

  if (!req.files || req.files.length == 0) {
    res.status(500).json({
      "error": "No Image Uploaded."
    });

    return;
  }

  // AWS Rekognition Configuration
  const config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  });

  //AWS Rekognition Client
  const client = new aws.Rekognition();

  const uploadedFile = req.files.file;

  //Bind buffer data of image as a parameter
  const params = {
    Image: {
      Bytes: uploadedFile.data
    },
  };

  client.detectLabels(params, function (awsError, awsResponse) {

    if (awsError) {
      console.log(awsError);

      res.status(500).json({
        "error": "Server error."
      });

    } else {
      res.json({
        "labels": awsResponse.Labels.map((label) => label.Name)
      });
    }
    
  });
});

module.exports = router;
