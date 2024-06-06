import React from "react";
import UpgradeItem from "./UpgradeItem";
import Card from "../UI/Card";
import Decimal from "decimal.js";

type upgradeType = {
  key: string;
  name: string;
  effectDesc: string;
  effectValuePrefix: string;
  effectValueSuffix: string;
  effectValue: (l: number) => Decimal;
  baseCost: number;
  costScaling: number;
  level: number;
  effect: (x: Decimal, l: number) => Decimal;
};

type propsType = {
  upgradesList: upgradeType[];
  setLevels: (id: string) => void;
};

const UpgradeList = (props: propsType) => {
  return (
    <div className="h-fit p-4 rounded-b-xl bg-background-secondary bg-opacity-40">
      {props.upgradesList.map((upgrade) => (
        <UpgradeItem
          key={upgrade.key}
          id={upgrade.key}
          name={upgrade.name}
          effectDesc={upgrade.effectDesc}
          effectValuePrefix={upgrade.effectValuePrefix}
          effectValueSuffix={upgrade.effectValueSuffix}
          effectValue={upgrade.effectValue}
          effect={upgrade.effect}
          level={upgrade.level}
          setLevel={props.setLevels}
          baseCost={upgrade.baseCost}
          costScaling={upgrade.costScaling}
        />
      ))}
    </div>
  );
};

export default UpgradeList;
