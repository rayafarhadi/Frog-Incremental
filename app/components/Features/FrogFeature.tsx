import Decimal from "decimal.js";
import React from "react";
import UpgradeList from "../Upgrades/UpgradeList";

type upgradeType = {
  key: string;
  name: string;
  effectDesc: string;
  effectValuePrefix: string;
  effectValueSuffix: string;
  effectValue: (l: number) => Decimal;
  baseCost: Decimal;
  costScaling: number;
  level: number;
  effect: (x: Decimal, l: number) => Decimal;
};

type propsType = {
  upgradesList: upgradeType[];
  setLevels: (id: string) => void;
};

const FrogFeature = (props: propsType) => {
  return (
    <UpgradeList
      upgradesList={props.upgradesList}
      setLevels={props.setLevels}
    />
  );
};

export default FrogFeature;
