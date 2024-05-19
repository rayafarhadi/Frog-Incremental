import React from "react";

type propsType = {
  name: string;
  effect: string;
  level: number;
  baseCost: number;
  costScaling: number;
};

const UpgradeItem = (props: propsType) => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <div>{props.name}</div>
        <div>Level: {props.level}</div>
      </div>
      <div className="text-center my-auto">{props.effect}</div>
      <div className="flex flex-row place-content-end">
        <button className="border-2 w-48 border-black">
          Cost: {props.baseCost * (props.costScaling ^ props.level)}
        </button>
      </div>
    </div>
  );
};

export default UpgradeItem;
