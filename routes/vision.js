var express = require('express');
var router = express.Router();

const AWS = require("aws-sdk");

router.post('/classify', async function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];
  let labelArray = [];
  // Your code starts here //
  try {

    const config = new AWS.Config({
      accessKeyId: "AKIARAR74F5B2ZJFROOU",
      secretAccessKey: "58t6FYfBVhi0FhEKFwxOWExsgASY3dtg6EHAPcVP",
      region: "ap-southeast-1"
    }) 

    const rekognition = new AWS.Rekognition({
      region: "ap-southeast-1",
    });
      
    await rekognition.detectLabels({
      Image: {
        Bytes: req.files.file.data
      }
    }, (err, data) => {
      if (err) {
        console.log(err, err . stack) ;
        res.status(500).json({
          "error": "Error"
        });
      }else {
        console.log(data.Labels);
        for (let Label of data.Labels) {
          labelArray.push(Label.Name);
        }
        res.json({
          "labels": labelArray
        });
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "error": "Error"
    });
  }
  // Your code ends here //
});

module.exports = router;
