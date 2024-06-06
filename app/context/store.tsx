"use client";

import Decimal from "decimal.js";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type propType = {
  bugs: Decimal;
  setBugs: Dispatch<SetStateAction<Decimal>>;
};

const GlobalContext = createContext<propType>({
  bugs: new Decimal(0),
  setBugs: (): Decimal => new Decimal(0),
});

export const GlobalContextProvider = ({ children }: any) => {
  const [bugs, setBugs] = useState(new Decimal(0));

  return (
    <GlobalContext.Provider value={{ bugs, setBugs }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
