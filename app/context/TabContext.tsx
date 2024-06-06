"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type propType = {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const TabContext = createContext<propType>({
  selectedTab: "",
  setSelectedTab: (): string => "",
});

export const TabContextProvider = ({ children }: any) => {
  const [selectedTab, setSelectedTab] = useState("frog");

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useGlobalContext = () => useContext(TabContext);
