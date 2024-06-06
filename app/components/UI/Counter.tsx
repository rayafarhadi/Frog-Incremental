import React, { Dispatch, SetStateAction } from "react";
import { useInterval } from "../../hooks/Hooks";
import Card from "./Card";
import Decimal from "decimal.js";

type propsType = {
  title: string;
  value: Decimal;
  tickrate: Decimal;
  increaseValue: Decimal;
  setValue: Dispatch<SetStateAction<Decimal>>;
};

const Counter = (props: propsType) => {
  useInterval(() => {
    props.setValue(props.value.plus(props.increaseValue));
  }, props.tickrate);

  return (
    <div className="py-2">
      <Card>
        <span className="font-actionbold">{props.title}:</span>{" "}
        {props.value.toPrecision(4).toString()} {"("}
        {props.increaseValue
          .times(new Decimal(1000).div(props.tickrate))
          .round()
          .toPrecision(4)
          .toString()}{" "}
        {"/s)"}
      </Card>
    </div>
  );
};

export default Counter;
