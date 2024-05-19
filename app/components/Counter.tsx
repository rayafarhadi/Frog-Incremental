import React, { Dispatch, SetStateAction } from "react";
import { useInterval } from "../hooks/Hooks";

type propsType = {
  title: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const Counter = (props: propsType) => {
  useInterval(() => {
    props.setValue(props.value + 1);
  }, 1000);

  return (
    <div className="text-center">
      {props.title}: {props.value}
    </div>
  );
};

export default Counter;
