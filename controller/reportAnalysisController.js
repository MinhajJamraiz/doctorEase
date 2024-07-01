const path = require("path");
const tesseract = require("tesseract.js");
const natural = require("natural");
const multer = require("multer");
const fs = require("fs");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const logger = require("./../utils/logger");
const symptoms = require("./../data/symptoms");
const namedSymptoms = require("./../data/namedSymptoms");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reportAnalysis");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.body.id}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image!  Please upload only Images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadReport = upload.single("analysisReport");

exports.reportAnalysis = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY

  const filepath = path.join("uploads/reportAnalysis", req.file.filename);

  // const imagePath = path.join(__dirname, req.file);

  tesseract
    .recognize(filepath, "eng")
    .then((result) => {
      const extractedText = result.data.text;
      const diagnosis = diagnoseText(extractedText);
      //SEND RESPONSE
      res.status(200).json({
        status: "success",
        diagnosis,
        extractedText,
      });
      logger.info("Report Analysis Successful.");
      fs.unlink(filepath, (err) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info("Uploaded file Deleted");
        }
      });
    })
    .catch((err) => {
      logger.error("Report Analysis Failed.");
      console.log(err);
    });
});

const diagnoseText = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  //SAMPLE OBJECT
  //KEYWORDS BASED DIAGNOSIS
  // const symptoms = {

  //   fever: ["fever" ,"hightemperature"],
  //   commonCold: [
  //     "runnynose",
  //     "sneezing",
  //     "coughing",
  //     "congestion",
  //     "sorethroat",
  //   ],
  // };

  //Finding the symptoms from the report Text.'
  let foundSymptoms = [];
  Object.entries(symptoms).forEach(([key, symptoms]) => {
    for (const symptom of symptoms) {
      if (tokens.includes(symptom)) {
        foundSymptoms = [...foundSymptoms, symptom];
      }
    }
  });
  //Comparing the found symptoms with the disease symptoms
  for (const [diagnosis, keywords] of Object.entries(namedSymptoms)) {
    let matchedSymptoms = [];
    for (const keyword of keywords) {
      if (foundSymptoms.includes(keyword)) {
        matchedSymptoms = [...matchedSymptoms, keyword];
        //check for symptoms in the token.

        //save found symptoms
        //compare with database.
        //show result

        // return `Possible ${diagnosis}`;
      }
    }

    if (compareArray(keywords, matchedSymptoms)) {
      return `${diagnosis}`;
    }
  }
  return "No Specific Disease found for these symptoms";
};

function compareArray(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}
