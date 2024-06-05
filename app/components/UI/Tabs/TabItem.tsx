import React, { Dispatch, SetStateAction } from "react";

type propsType = {
  name: string;
  active: boolean;
  selectTab: Dispatch<SetStateAction<string>>;
};

const TabItem = (props: propsType) => {
  const tabClasses = props.active
    ? "bg-background-secondary bg-opacity-40"
    : "bg-button-primary bg-opacity-40 border-x-2 border-b-2 border-highlight hover:cursor-pointer";

  return (
    <div
      className={`p-4 w-full rounded-t-3xl text-center text-2xl ${tabClasses}`}
      onClick={() => props.selectTab(props.name)}
    >
      {props.name}
    </div>
  );
};

export default TabItem;
