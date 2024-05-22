"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type propType = {
  bugs: number;
  setBugs: Dispatch<SetStateAction<number>>;
};

const GlobalContext = createContext<propType>({
  bugs: 0,
  setBugs: (): number => 0,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [bugs, setBugs] = useState(0);

  return (
    <GlobalContext.Provider value={{ bugs, setBugs }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
