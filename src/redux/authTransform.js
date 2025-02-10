import { createTransform } from "redux-persist";

// The "inbound" function is called before state is persisted.
// Here, we extract only the token from the auth state.
const saveSubset = (inboundState, key) => {
  return { token: inboundState.token };
};

// The "outbound" function is called when state is rehydrated.
// We return the saved subset.
const restoreSubset = (outboundState, key) => {
  return { token: outboundState.token };
};

export default createTransform(saveSubset, restoreSubset, { whitelist: ["auth"] });