import firebase from "../firebase";
import { createContext, useContext } from "react";

const dbContext = createContext({});

export const useDb = (): any => useContext(dbContext);

export const DBProvider = ({ children }) => {
  const db = firebase.firestore()

  return <dbContext.Provider value={{ db }}>{children}</dbContext.Provider>
};
