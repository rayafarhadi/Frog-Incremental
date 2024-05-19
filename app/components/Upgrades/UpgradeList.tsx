import React from "react";
import UpgradeItem from "./UpgradeItem";

type upgradeType = {
  name: string;
  effect: string;
  level: number;
  baseCost: number;
  costScaling: number;
};

type propsType = {
  upgradesList: upgradeType[];
};

const UpgradeList = (props: propsType) => {
  return (
    <div>
      {props.upgradesList.map((upgrade) => (
        <UpgradeItem
          name={upgrade.name}
          effect={upgrade.effect}
          level={upgrade.level}
          baseCost={upgrade.baseCost}
          costScaling={upgrade.costScaling}
        />
      ))}
    </div>
  );
};

export default UpgradeList;
