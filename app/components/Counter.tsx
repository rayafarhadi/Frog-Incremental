import React, { Dispatch, SetStateAction } from "react";
import { useInterval } from "../hooks/Hooks";

type propsType = {
  title: string;
  value: number;
  tickrate: number;
  increaseValue: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const Counter = (props: propsType) => {
  useInterval(() => {
    props.setValue(props.value + props.increaseValue);
  }, props.tickrate);

  return (
    <div className="text-center">
      {props.title}: {props.value} {"("}{" "}
      {Math.round(props.increaseValue * (1000 / props.tickrate))} {"/s)"}
    </div>
  );
};

export default Counter;
