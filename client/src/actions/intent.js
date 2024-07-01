import { INTENT_SAVED, INTENT_FAILED } from "./../actions/types";
import axios from "axios";

export const setIntent =
  ({ message }) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      //Get All Intents
      const intents = await axios.get("http://localhost:5000/api/v1/intent");
      //   JSON.stringify(intents);

      // CHeceking If a Intent already exsists in the state.
      // If true , search based upon name rather than Examples. ( After First Intent)
      // Else Search based on Examples. (If Intent)
      const filteredIntents = Object.entries(intents.data.intents).filter(
        ([key, value]) => value.status
      );
      // const matchedIntent = intents.data.intents.filter((intent) => {
      //   let count = 0;
      //   console.log(count);
      //   if (
      //     intent.examples.length === 0 &&
      //     intent.name === message.toLowerCase()
      //   ) {
      //     console.log(message);
      //     console.log(intent.name);
      //     count++;
      //     return intent;
      //   } else if (
      //     count === 0 &&
      //     intent.examples.some((example) =>
      //       message.toLowerCase().includes(example.toLowerCase())
      //     )
      //   )
      //     return intent;
      //   else {
      //     return;
      //   }
      //   // return (
      //   //   intent.examples.some((example) =>
      //   //     message.toLowerCase().includes(example.toLowerCase())
      //   //   ) && intent
      //   // );
      // });
      let matchedIntent = [];
      matchedIntent = intents.data.intents.filter((intent) => {
        if (
          intent.examples.length === 0 &&
          intent.name === message.toLowerCase()
        )
          return intent;
      });
      if (matchedIntent.length === 0) {
        matchedIntent = intents.data.intents.filter((intent) => {
          if (
            intent.examples.some((example) =>
              message.toLowerCase().includes(example.toLowerCase())
            )
          )
            return intent;
        });
      }
      // const item = matchedIntent.length - 1;

      if (!matchedIntent[0]) {
        dispatch({ type: INTENT_FAILED });
      } else {
        dispatch({ type: INTENT_SAVED, payload: matchedIntent[0] });
        return matchedIntent[0];
      }
    } catch (err) {
      console.log(err);
    }
  };

export const removeIntent = () => (dispatch) => {
  dispatch({ type: INTENT_FAILED });
};
