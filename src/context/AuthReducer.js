import React, { useReducer, createContext } from "react";
import useCombinedReducers from "use-combined-reducers";

import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS
} from "../resources/action_types";
const isEmpty = require("is-empty");

export const DispatchContext = createContext(null);
export const StateContext = createContext(null);

const authInitialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const errorInitialState = {};

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export const DispatchProvider = props => {
  const [state, dispatch] = useCombinedReducers({
    authState: useReducer(authReducer, authInitialState),
    errorState: useReducer(errorReducer, errorInitialState)
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
