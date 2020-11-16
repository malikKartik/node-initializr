import React from "react";

const Label = (props) => {
  return (
    <>
      <p
        style={{
          margin: "5px",
          fontFamily: `"Roboto", sans-serif`,
          display: "inline",
        }}
      >
        {props.children}
      </p>
    </>
  );
};

export default Label;
