// const AssistantV2 = require("ibm-watson/assistant/v2");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
// const assistant = new AssistantV2({
//   version: "2024-05-12", //YYYY-MM-DD
//   serviceName: "assistant",
//   authenticator: {
//     apiKey: "my-api-key",
//   },
//   serviceURL: "My Service URL",
// });
// exports.message = catchAsync(async (req, res) => {
//   const { message } = req.body;
//   const response = await assistant.message({
//     assistantId: "My-assistant-id",
//     input: {
//       message_type: "text",
//       text: message,
//     },
//   });
// });
const Intents = [
  //First Intents -------- Starting Intents
  {
    name: "start_diagnosis",
    examples: ["start diagnosis", "diagnose"],
    action: "startDiagnosis",
  },

  {
    name: "has_fever",
    examples: ["I might have a fever", "I have a fever", "temprature", "fever"],
    action: "askFever",
  },
  {
    name: "has_fever",
    examples: ["do you have a fever?"],
    affirmativeAction: "askSoreThroat",
    negativeAction: "askCough",
  },
  {
    name: "has_sore_throat",
    examples: ["do you have a sore throat?", "sore throat?"],
    affirmativeAction: "askCough",
    negativeAction: "endDiagnosis",
  },
  {
    name: "has_cough",
    examples: ["do you have a cough?", "cough?"],
    affirmativeAction: "askDifficultyBreathing",
    negativeAction: "endDiagnosis",
  },
  {
    name: "has_difficulty_breathing",
    examples: ["do you have difficulty breathing?", "difficulty breathing?"],
    affirmativeAction: "endDiagnosis",
    negativeAction: "endDiagnosis",
  },
  // Add more intents as needed
];

const Actions = {
  askFever: () => "Do you have a fever?",
  askSoreThroat: () => "Do you have a sore throat?",
  askCough: () => "Do you have a cough?",
  askDifficultyBreathing: () => "Do you have difficulty breathing?",
  endDiagnosis: () => "Thank you for completing the diagnosis.",
  // Define more actions for other intents
};

// // Function to process incoming message and generate response
// function processMessage(message) {
//   // Find the intent that matches the message
//   const matchedIntent = intents.find((intent) =>
//     intent.examples.some((example) =>
//       message.toLowerCase().includes(example.toLowerCase())
//     )
//   );

//   // If no matching intent is found, return a default response
//   if (!matchedIntent) {
//     return "Sorry, I didn't understand that.";
//   }

//   // Determine the appropriate action based on the user's response
//   const action = getActionBasedOnResponse(matchedIntent, message.toLowerCase());
//   if (action) {
//     return action();
//   } else {
//     return "Sorry, something went wrong.";
//   }
// }

// Function to determine the action based on the user's response (affirmative or negative)
function getActionBasedOnResponse(intent, response) {
  if (intent.action) {
    return Actions[intent.action];
  } else {
    if (response.includes("yes")) {
      return Actions[intent.affirmativeAction];
    } else if (response.includes("no")) {
      return Actions[intent.negativeAction];
    } else {
      return null; // Invalid response
    }
  }
}

// Example usage
// const userMessage = "yes";
// // const botResponse = processMessage(userMessage);
// console.log(botResponse); // Output: "Do you have a sore throat?"

exports.processMessage = catchAsync(async (req, res, next) => {
  // Find the intent that matches the message
  const { message } = req.body;

  const matchedIntent = Intents.find((intent) =>
    intent.examples.some((example) =>
      message.toLowerCase().includes(example.toLowerCase())
    )
  );

  // If no matching intent is found, return a default response
  if (!matchedIntent) {
    new AppError(
      "Sorry I could not understand that. Please repeat or rephrase your sentence.",
      404
    );
  }

  // Determine the appropriate action based on the user's response
  const action = getActionBasedOnResponse(matchedIntent, message.toLowerCase());
  if (!action) {
    new AppError("Something went Wrong.", 404);
  }
  const botMessage = action();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    botMessage,
  });
  //   logger.info("All Users fetched Successfully.");
});
