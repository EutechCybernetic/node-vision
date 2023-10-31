var express = require("express");
var router = express.Router();

router.post("/classify", function (req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];

  // Your code starts here //

  const { fromIni } = require("@aws-sdk/credential-providers");
  const {
    RekognitionClient,
    DetectLabelsCommand,
  } = require("@aws-sdk/client-rekognition");

  const uplodedFile = req.files.file;

  const client = new RekognitionClient({
    // set region as ap-southeast-1(singapore)
    region: "ap-southeast-1",

    // different kind of credentials configurations options can be found from here : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-credential-providers/#fromenv
    credentials: fromIni({ profile: "work-account" }),
  });

  const params = {
    Image: {
      Bytes: uplodedFile.data,
    },
    MaxLabels: 10,
    MinConfidence: 90,
  };

  let awsResponse = client.send(new DetectLabelsCommand(params));
  awsResponse
    .then((dataResponse) => {
      const mappedLabels = dataResponse.Labels.map((labels) => labels.Name);
      res.json({
        labels: mappedLabels,
      });
    })
    .catch((err) => {
      const error = {
        error: "Unable to process the request",
      };
      res.status(500).send(error);
    });

  // Your code ends here //
});

module.exports = router;
