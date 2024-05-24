import React, { ReactElement, ReactNode } from "react";

type propType = {
  children: ReactNode;
};

const Card = (props: propType) => {
  return (
    <div
      className={
        "rounded-xl bg-background-secondary bg-opacity-40 p-4 border-2 border-black"
      }
    >
      {props.children}
    </div>
  );
};

export default Card;
