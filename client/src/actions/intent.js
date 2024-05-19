import { INTENT_SAVED, INTENT_FAILED } from "./../actions/types";
import axios from "axios";

export const setIntent =
  ({ message }) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      console.log(state);
      //Get All Intents
      const intents = await axios.get("http://localhost:5000/api/v1/intent");
      //   JSON.stringify(intents);

      // CHeceking If a Intent already exsists in the state.
      // If true , search based upon name rather than Examples. ( After First Intent)
      // Else Search based on Examples. (If Intent)
      const filteredIntents = Object.entries(intents.data.intents).filter(
        ([key, value]) => value.status
      );
      console.log(filteredIntents);
      const matchedIntent = intents.data.intents.filter((intent) => {
        if (
          intent.examples.some((example) =>
            message.toLowerCase().includes(example.toLowerCase())
          )
        )
          return intent;
        else {
          return;
        }
        // return (
        //   intent.examples.some((example) =>
        //     message.toLowerCase().includes(example.toLowerCase())
        //   ) && intent
        // );
      });
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
