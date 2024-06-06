"use client";
import { useEffect, useState } from "react";
import { useGlobalContext as bugctx } from "./context/BugsContext";
import { useGlobalContext as tabctx } from "./context/TabContext";
import Counter from "./components/UI/Counter";
import { useInterval } from "./hooks/Hooks";
import { load, save } from "./data/save";
import Card from "./components/UI/Card";
import Image from "next/image";
import Decimal from "decimal.js";
import FrogFeature from "./components/Features/FrogFeature";
import TabList from "./components/UI/Tabs/TabList";

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

const DEFAULT_TICK_RATE = new Decimal(1000);
const DEFAULT_INCREASE_VALUE = new Decimal(1);

const UPGRADES = {
  f1: {
    key: "f1",
    name: "Tongue Speed",
    effectDesc: "Eat bugs faster",
    effectValue: (l: number) => new Decimal(100 * l),
    effectValuePrefix: "Speed +",
    effectValueSuffix: "%",
    baseCost: new Decimal(10),
    costScaling: 2,
    level: 0,
    effect: (x: Decimal, l: number) => x.div(1 + 1 * l),
  },
  f2: {
    key: "f2",
    name: "Camouflage Skin",
    effectDesc: "Become harder to spot",
    effectValue: (l: number) => new Decimal(l),
    effectValuePrefix: "Base Bugs +",
    effectValueSuffix: "",
    baseCost: new Decimal(50),
    costScaling: 3,
    level: 0,
    effect: (x: Decimal, l: number) => x.plus(l),
  },
  f3: {
    key: "f3",
    name: "Tongue Length",
    effectDesc: "Increase the range of your tongue",
    effectValue: (l: number) => new Decimal(50 * l),
    effectValuePrefix: "Total Bugs +",
    effectValueSuffix: "%",
    baseCost: new Decimal(100),
    costScaling: 1.5,
    level: 0,
    effect: (x: Decimal, l: number) => x.times(1 + 0.5 * l),
  },
  f4: {
    key: "f4",
    name: "Tongue Strength",
    effectDesc: "Increase the amount of bugs your tongue can hold",
    effectValue: (l: number) => new Decimal(Math.pow(2, l)),
    effectValuePrefix: "Total Bugs x",
    effectValueSuffix: "",
    baseCost: new Decimal(1000),
    costScaling: 5,
    level: 0,
    effect: (x: Decimal, l: number) => x.times(Math.pow(2, l)),
  },
  f5: {
    key: "f5",
    name: "Leg Strength",
    effectDesc: "Jump higher. Reach more bugs",
    effectValue: (l: number) => new Decimal(1 + 0.1 * l),
    effectValuePrefix: "Total Bugs ^",
    effectValueSuffix: "",
    baseCost: new Decimal(100000),
    costScaling: 10,
    level: 0,
    effect: (x: Decimal, l: number) => x.pow(1 + 0.1 * l),
  },
};

const TICKSPEED_UPGRADES = ["f1"];
const BUG_UPGRADES = ["f2", "f3", "f4", "f5"];

export default function Home() {
  const { bugs, setBugs } = bugctx();
  const { selectedTab, setSelectedTab } = tabctx();

  let [upgrades, setUpgrades] = useState(UPGRADES);
  let [loaded, setLoaded] = useState(false);

  function handleLevelChange(id: string) {
    const newUpgrades = upgrades;
    Object.values(newUpgrades).forEach((u) => {
      if (u.key === id) {
        setBugs(
          bugs.minus(u.baseCost.times(Math.pow(u.costScaling, u.level)).floor())
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
    return x.round();
  }

  function getIncreaseValue() {
    let x = DEFAULT_INCREASE_VALUE;
    Object.values(upgrades).forEach((u) => {
      if (BUG_UPGRADES.includes(u.key)) {
        x = u.effect(x, u.level);
      }
    });
    return x.round();
  }

  useEffect(() => {
    if (!loaded) {
      handleLoading();
      let data: saveType = load();

      if (data != null) {
        if (data.bugs === null) {
          setBugs(new Decimal(0));
        } else {
          setBugs(new Decimal(data.bugs));
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

  const TABS = [
    {
      key: "frog",
      content: (
        <FrogFeature
          upgradesList={Object.values(upgrades)}
          setLevels={handleLevelChange}
        />
      ),
    },
    {
      key: "options",
      content: <div>Options</div>,
    },
    {
      key: "coming soon",
      content: <div>Coming Soon</div>,
    },
  ];

  return (
    <main className="min-h-screen px-12 py-4 bg-background-primary font-action text-xl">
      <div
        id="side-bar"
        className="fixed flex flex-col w-1/3 pl-8 py-8 top-0 left-0 h-full overflow-hidden"
      >
        <div
          id="resources"
          className="basis-1/2 pt-4 pb-2 text-3xl p-4 rounded-xl bg-background-secondary bg-opacity-40"
        >
          <div className="text-center pb-2">Resources</div>
          <Counter
            title="Bugs"
            tickrate={getTickRate()}
            increaseValue={getIncreaseValue()}
            value={bugs}
            setValue={setBugs}
          />
          <Card>Coming Soon</Card>
        </div>
        <div id="frog" className="basis-1/2 pt-2 pb-4">
          <Image
            className="w-full rounded-xl border-4 border-background-secondary border-opacity-40"
            src="/images/Frog-Pond.png"
            alt="frog"
            width={512}
            height={512}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div id="spacer" className="basis-1/3" />
        <div id="upgrades" className="basis-2/3">
          <TabList tabList={TABS} />
          <div>{TABS.find((t) => t.key === selectedTab)?.content}</div>
        </div>
      </div>
    </main>
  );
}
