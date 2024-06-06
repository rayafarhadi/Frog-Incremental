import TabItem from "./TabItem";
import { useGlobalContext } from "@/app/context/TabContext";

type tabType = {
  key: string;
};

type propsType = {
  tabList: tabType[];
};

const TabList = (props: propsType) => {
  const { selectedTab, setSelectedTab } = useGlobalContext();

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
