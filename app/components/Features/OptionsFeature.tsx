import { getSaveData, load, save } from "@/app/data/save";
import Decimal from "decimal.js";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

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

type propType = {
  upgradeData: any;
  bugs: Decimal;
  setBugs: Dispatch<SetStateAction<Decimal>>;
  setLevel: (id: string, level: number) => void;
};

const OptionsFeature = (props: propType) => {
  let fileRef = useRef<HTMLInputElement | null>(null);

  function saveToClipboard() {
    navigator.clipboard.writeText(
      getSaveData(props.upgradeData, props.bugs.toString())
    );
    toast.success("Saved game data to clipboard.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      theme: "dark",
      transition: Slide,
    });
  }

  function saveToFile() {
    const url = window.URL.createObjectURL(
      new Blob([getSaveData(props.upgradeData, props.bugs.toString())], {
        type: "text/plain",
      })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "frog-incremental-save-data.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Saved game data to file.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      theme: "dark",
      transition: Slide,
    });
  }

  function getClipboardData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(navigator.clipboard.readText()), 1000);
    }) as Promise<string>;
  }

  async function loadFromClipboard() {
    try {
      let cbtext = await getClipboardData();

      let data: saveType = load(cbtext);

      if (data != null) {
        if (data.bugs === null) {
          props.setBugs(new Decimal(0));
        } else {
          props.setBugs(new Decimal(data.bugs));
        }

        Object.values(data.upgrades).forEach((u) => {
          props.setLevel(u.key, u.level);
        });
      }

      toast.success("Loaded game data from clipboard.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        theme: "dark",
        transition: Slide,
      });
    } catch (e) {
      console.error(e);

      toast.error("Failed to load game data from clipboard.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        theme: "dark",
        transition: Slide,
      });
    }
  }

  function getFile() {
    fileRef.current?.click();
  }

  function getFileData(file: File) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(file.text()), 1000);
    }) as Promise<string>;
  }

  async function loadFromFile(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("loadFromFile");
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      console.log("file selected");
      let filetext = await getFileData(file);

      console.log(filetext);

      let data: saveType = load(filetext);

      if (data != null) {
        if (data.bugs === null) {
          props.setBugs(new Decimal(0));
        } else {
          props.setBugs(new Decimal(data.bugs));
        }

        Object.values(data.upgrades).forEach((u) => {
          props.setLevel(u.key, u.level);
        });
      }

      toast.success("Loaded game data from file.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        theme: "dark",
        transition: Slide,
      });
    } else {
      console.log("No file selected");
    }

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function resetGame() {
    if (
      window.confirm(
        "Are you sure you want to reset the game? All unsaved data will be lost."
      )
    ) {
      let data: saveType = load();

      props.setBugs(new Decimal(0));

      Object.values(data.upgrades).forEach((u) => {
        props.setLevel(u.key, 0);
      });

      toast.success("Game reset!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        theme: "dark",
        transition: Slide,
      });
    }
  }

  return (
    <div className="feature-card">
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col">
          <button
            className="border-2 rounded-md p-2 my-4 h-20 w-48 border-black bg-button-primary disabled:opacity-40"
            onClick={saveToClipboard}
          >
            Save to Clipboard
          </button>
          <button
            className="border-2 rounded-md p-2 my-4 h-20 w-48 border-black bg-button-primary disabled:opacity-40"
            onClick={saveToFile}
          >
            Save to File
          </button>
        </div>
        <div className="flex flex-col">
          <button
            className="border-2 rounded-md p-2 my-4 h-20 w-48 border-black bg-button-primary disabled:opacity-40"
            onClick={loadFromClipboard}
          >
            Load from Clipboard
          </button>
          <div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={loadFromFile}
            />
            <button
              className="border-2 rounded-md p-2 my-4 h-20 w-48 border-black bg-button-primary disabled:opacity-40"
              onClick={getFile}
            >
              Load from File
            </button>
          </div>
        </div>
        <button
          className="border-2 rounded-md p-2 my-4 h-20 w-48 border-black bg-red-700 disabled:opacity-40"
          onClick={resetGame}
        >
          RESET!
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        theme="dark"
        transition={Slide}
      />
    </div>
  );
};

export default OptionsFeature;
