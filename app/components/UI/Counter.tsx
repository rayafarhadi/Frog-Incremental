import React, { Dispatch, SetStateAction } from "react";
import { useInterval } from "../../hooks/Hooks";
import Card from "./Card";

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
    <div className="py-2">
      <Card>
        <span className="font-actionbold">{props.title}:</span> {props.value}{" "}
        {"("} {Math.round(props.increaseValue * (1000 / props.tickrate))}{" "}
        {"/s)"}
      </Card>
    </div>
  );
};

export default Counter;
