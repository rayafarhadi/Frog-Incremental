import React from "react";
import { useGlobalContext } from "../../context/store";

type propsType = {
  id: string;
  name: string;
  effectDesc: string;
  effectValuePrefix: string;
  effectValueSuffix: string;
  effectValue: (l: number) => number;
  effect: (x: number, l: number) => number;
  baseCost: number;
  costScaling: number;
  level: number;
  setLevel: (id: string) => void;
};

const UpgradeItem = (props: propsType) => {
  const { bugs, setBugs } = useGlobalContext();

  let cost = Math.floor(
    props.baseCost * Math.pow(props.costScaling, props.level)
  );

  return (
    <div className="grid grid-cols-3">
      <div>
        <div>{props.name}</div>
        <div>Level: {props.level}</div>
        <div>
          {props.effectValuePrefix}
          {props.effectValue(props.level)}
          {props.effectValueSuffix}
        </div>
      </div>
      <div className="text-center my-auto">{props.effectDesc}</div>
      <div className="flex flex-row place-content-end">
        <button
          onClick={() => props.setLevel(props.id)}
          disabled={cost > bugs}
          className="border-2 w-48 border-black"
        >
          Cost: {cost}
        </button>
      </div>
    </div>
  );
};

export default UpgradeItem;
