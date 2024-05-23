"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./context/store";
import Counter from "./components/Counter";
import UpgradeList from "./components/Upgrades/UpgradeList";
import { useInterval } from "./hooks/Hooks";
import { load, save } from "./data/save";

type saveType = {
  bugs: number;
  upgrades: {
    f1: { key: string; level: number };
    f2: { key: string; level: number };
    f3: { key: string; level: number };
    f4: { key: string; level: number };
    f5: { key: string; level: number };
  };
};

const DEFAULT_TICK_RATE = 1000;
const DEFAULT_INCREASE_VALUE = 1;

const UPGRADES = {
  f1: {
    key: "f1",
    name: "Tongue Speed",
    effectDesc: "Eat bugs faster",
    effectValue: (l: number) => 100 * l,
    effectValuePrefix: "Speed +",
    effectValueSuffix: "%",
    baseCost: 10,
    costScaling: 2,
    level: 0,
    effect: (x: number, l: number) => x / (1 + 1 * l),
  },
  f2: {
    key: "f2",
    name: "Camouflage Skin",
    effectDesc: "Become harder to spot",
    effectValue: (l: number) => l,
    effectValuePrefix: "Base Bugs +",
    effectValueSuffix: "",
    baseCost: 50,
    costScaling: 3,
    level: 0,
    effect: (x: number, l: number) => x + l,
  },
  f3: {
    key: "f3",
    name: "Tongue Length",
    effectDesc: "Increase the range of your tongue",
    effectValue: (l: number) => 50 * l,
    effectValuePrefix: "Total Bugs +",
    effectValueSuffix: "%",
    baseCost: 100,
    costScaling: 1.5,
    level: 0,
    effect: (x: number, l: number) => x * (1 + 0.5 * l),
  },
  f4: {
    key: "f4",
    name: "Tongue Strength",
    effectDesc: "Increase the amount of bugs your tongue can hold at once",
    effectValue: (l: number) => Math.pow(2, l),
    effectValuePrefix: "Total Bugs x",
    effectValueSuffix: "",
    baseCost: 1000,
    costScaling: 5,
    level: 0,
    effect: (x: number, l: number) => x * Math.pow(2, l),
  },
  f5: {
    key: "f5",
    name: "Leg Strength",
    effectDesc: "Increase jump height",
    effectValue: (l: number) => 1 + 0.1 * l,
    effectValuePrefix: "Total Bugs ^",
    effectValueSuffix: "",
    baseCost: 100000,
    costScaling: 10,
    level: 0,
    effect: (x: number, l: number) => Math.pow(x, 1 + 0.1 * l),
  },
};

const TICKSPEED_UPGRADES = ["f1"];
const BUG_UPGRADES = ["f2", "f3", "f4", "f5"];

export default function Home() {
  const { bugs, setBugs } = useGlobalContext();

  let [upgrades, setUpgrades] = useState(UPGRADES);
  let [loaded, setLoaded] = useState(false);

  function handleLevelChange(id: string) {
    const newUpgrades = upgrades;
    Object.values(newUpgrades).forEach((u) => {
      if (u.key === id) {
        setBugs(
          bugs - Math.floor(u.baseCost * Math.pow(u.costScaling, u.level))
        );
        u.level++;
      }
    });
    setUpgrades(newUpgrades);
  }

  function setLevel(id: string, level: number) {
    const newUpgrades = upgrades;
    Object.values(newUpgrades).forEach((u) => {
      if (u.key === id) {
        u.level = level;
      }
    });
    setUpgrades(newUpgrades);
  }

  function handleLoading() {
    setLoaded(!loaded);
  }

  function getTickRate() {
    let x = DEFAULT_TICK_RATE;
    Object.values(upgrades).forEach((u) => {
      if (TICKSPEED_UPGRADES.includes(u.key)) {
        x = u.effect(x, u.level);
      }
    });
    return Math.round(x);
  }

  function getIncreaseValue() {
    let x = DEFAULT_INCREASE_VALUE;
    Object.values(upgrades).forEach((u) => {
      if (BUG_UPGRADES.includes(u.key)) {
        x = u.effect(x, u.level);
      }
    });
    return Math.round(x);
  }

  useEffect(() => {
    if (!loaded) {
      handleLoading();
      let data: saveType = load();

      if (data != null) {
        if (data.bugs === null) {
          setBugs(0);
        } else {
          setBugs(data.bugs);
        }

        Object.values(data.upgrades).forEach((u) => {
          setLevel(u.key, u.level);
        });
      }
    }
  }, []);

  useInterval(() => {
    save(upgrades, bugs);
  }, 100);

  return (
    <main className="flex flex-col min-h-screen mx-auto px-12 py-4 bg-blue-400">
      <Counter
        title="Bugs"
        tickrate={getTickRate()}
        increaseValue={getIncreaseValue()}
        value={bugs}
        setValue={setBugs}
      />
      <UpgradeList
        upgradesList={Object.values(upgrades)}
        setLevels={handleLevelChange}
      />
    </main>
  );
}
