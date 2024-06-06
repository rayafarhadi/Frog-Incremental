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

const BugsContext = createContext<propType>({
  bugs: new Decimal(0),
  setBugs: (): Decimal => new Decimal(0),
});

export const BugsContextProvider = ({ children }: any) => {
  const [bugs, setBugs] = useState(new Decimal(0));

  return (
    <BugsContext.Provider value={{ bugs, setBugs }}>
      {children}
    </BugsContext.Provider>
  );
};

export const useGlobalContext = () => useContext(BugsContext);
