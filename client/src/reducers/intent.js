import { INTENT_SAVED, INTENT_FAILED } from "./../actions/types";

const initialState = [
  //   {
  //     name: null,
  //     examples: null,
  //     action: null,
  //     affarmativeAction: null,
  //     negativeAction: null,
  //   },
];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INTENT_SAVED:
      return [...state, payload];
    case INTENT_FAILED:
      return [];
    default:
      return [];
  }
}
