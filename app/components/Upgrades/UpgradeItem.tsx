import React from "react";
import { useGlobalContext } from "../../context/BugsContext";
import Card from "../UI/Card";
import Decimal from "decimal.js";
import { format } from "../../data/format";

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
  maxLevel: number;
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
            <div>
              Level: {props.level} / {props.maxLevel}
            </div>
            <div>
              {props.effectValuePrefix}
              {format(props.effectValue(props.level))}
              {props.effectValueSuffix}
            </div>
          </div>
          <div id="effect" className="text-center my-auto">
            {props.effectDesc}
          </div>
          <div id="cost" className="flex flex-row place-content-end">
            <button
              onClick={() => props.setLevel(props.id)}
              disabled={
                bugs.comparedTo(cost) === -1 || props.level >= props.maxLevel
              }
              className="border-2 rounded-md w-48 border-black bg-button-primary disabled:opacity-40"
            >
              Cost: {format(cost)}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpgradeItem;
