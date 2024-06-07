import Cookies from "js-cookie";

export function getSaveData(upgradeData, bugs) {
  const upgradeLevels = {
    f1: { key: upgradeData.f1.key, level: upgradeData.f1.level },
    f2: { key: upgradeData.f2.key, level: upgradeData.f2.level },
    f3: { key: upgradeData.f3.key, level: upgradeData.f3.level },
    f4: { key: upgradeData.f4.key, level: upgradeData.f4.level },
    f5: { key: upgradeData.f5.key, level: upgradeData.f5.level },
  };

  const saveData = {
    bugs: bugs,
    upgrades: upgradeLevels,
  };

  return JSON.stringify(saveData);
}

export function save(upgradeData, bugs) {
  Cookies.set("saveData", getSaveData(upgradeData, bugs), {
    expires: 100000,
  });
}

export function load(data) {
  if (data) {
    return JSON.parse(data);
  } else if (
    Cookies.get("saveData") != null &&
    Cookies.get("saveData") != "undefined"
  ) {
    return JSON.parse(Cookies.get("saveData"));
  } else {
    return null;
  }
}
