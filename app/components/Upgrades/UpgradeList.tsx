import React from "react";
import UpgradeItem from "./UpgradeItem";

type upgradeType = {
  key: string;
  name: string;
  effectDesc: string;
  effectValuePrefix: string;
  effectValueSuffix: string;
  effectValue: (l: number) => number;
  baseCost: number;
  costScaling: number;
  level: number;
  effect: (x: number, l: number) => number;
};

type propsType = {
  upgradesList: upgradeType[];
  setLevels: (id: string) => void;
};

const UpgradeList = (props: propsType) => {
  return (
    <div>
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
