import React from "react";
import { useGlobalContext } from "../../context/store";
import Card from "../UI/Card";
import Decimal from "decimal.js";

type propsType = {
  id: string;
  name: string;
  effectDesc: string;
  effectValuePrefix: string;
  effectValueSuffix: string;
  effectValue: (l: number) => Decimal;
  effect: (x: Decimal, l: number) => Decimal;
  baseCost: Decimal;
  costScaling: number;
  level: number;
  setLevel: (id: string) => void;
};

const UpgradeItem = (props: propsType) => {
  const { bugs, setBugs } = useGlobalContext();

  let cost = props.baseCost
    .times(Math.pow(props.costScaling, props.level))
    .floor();

  return (
    <div className="py-4">
      <Card>
        <div className="grid grid-cols-3">
          <div id="info">
            <div className="font-actionbold">{props.name}</div>
            <div>Level: {props.level}</div>
            <div>
              {props.effectValuePrefix}
              {props.effectValue(props.level).toPrecision(4).toString()}
              {props.effectValueSuffix}
            </div>
          </div>
          <div id="effect" className="text-center my-auto">
            {props.effectDesc}
          </div>
          <div id="cost" className="flex flex-row place-content-end">
            <button
              onClick={() => props.setLevel(props.id)}
              disabled={bugs.comparedTo(cost) == -1}
              className="border-2 rounded-md w-48 border-black bg-button-primary disabled:opacity-40"
            >
              Cost: {cost.toPrecision(4).toString()}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpgradeItem;
