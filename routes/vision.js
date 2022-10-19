var express = require('express');
var router = express.Router();

const { Rekognition} = require("aws-sdk");

router.post('/classify', async function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];

  // Your code starts here //
  try {

    const rekognition = new Rekognition({
      region: "ap-southeast-1", // like us-east-1
    });
      
    await rekognition. detectLabels({
      Image: {
        Bytes: req.files.file.data
      }
    }, (err, data) => {
      if (err) {
        console.log(err, err . stack) ;
      }else {
        for (let Label of data.Labels) {
          labelArray.push(Label.Name);
        }
      }
    });

    res.json({
      "labels": labelArray
    });
    
  } catch (error) {
    console.log(error);
  }
  // Your code ends here //

  
});

module.exports = router;
