"use client";
import { useState } from "react";
import Counter from "./components/Counter";
import UpgradeList from "./components/Upgrades/UpgradeList";

const upgrades = [
  {
    name: "Upgrade 1",
    effect: "Effect 1",
    level: 0,
    baseCost: 10,
    costScaling: 1.1,
  },
  {
    name: "Upgrade 2",
    effect: "Effect 2",
    level: 0,
    baseCost: 100,
    costScaling: 1.15,
  },
];

export default function Home() {
  let [bugs, setBugs] = useState(0);

  return (
    <main className="flex flex-col min-h-screen mx-auto px-12 py-4">
      <Counter title="Bugs" value={bugs} setValue={setBugs} />
      <UpgradeList upgradesList={upgrades} />
    </main>
  );
}
