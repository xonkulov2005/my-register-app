import { useReducer, useContext, createContext } from "react";

export const GlobalContext = createContext();

const InitialState = {
  user: null,
  isAuthReady: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_READY":
      return { ...state, isAuthReady: true };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
