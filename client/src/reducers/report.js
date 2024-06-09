import { GET_REPORTS, DELETE_REPORTS } from "./../actions/types";

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
    case GET_REPORTS:
      return [...state, payload];
    case DELETE_REPORTS:
      return [];
    default:
      return [];
  }
}
