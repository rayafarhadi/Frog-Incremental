"use client";
import React, { useState } from "react";
import TabItem from "./TabItem";

type tabType = {
  key: string;
};

type propsType = {
  tabList: tabType[];
};

const TabList = (props: propsType) => {
  let [selectedTab, setSelectedTab] = useState("frog");

  return (
    <div className="flex flex-row mt-4">
      {props.tabList.map((tab) => (
        <TabItem
          key={tab.key}
          name={tab.key}
          active={tab.key === selectedTab}
          selectTab={setSelectedTab}
        />
      ))}
    </div>
  );
};

export default TabList;
