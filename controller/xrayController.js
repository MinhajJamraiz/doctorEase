const catchAsync = require("./../utils/catchAsync");
const logger = require("./../utils/logger");
// const tf = require("@tensorflow/tfjs-node");

exports.handlePredict = catchAsync(async (req, res, next) => {
  try {
    // const imageBuffer = req.file.buffer;
    // const imageTensor = tf.node
    //   .decodeImage(imageBuffer, 3)
    //   .resizeBilinear([224, 224])
    //   .expandDims();
    // const model = await modelLoader.loadModel();

    // const predictions = model.predict(imageTensor).dataSync();
    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      predictions,
    });
    logger.info("Image Processing Successful.");
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send({ error: "Error processing image" });
  }

  //EXECUTE QUERY
});
