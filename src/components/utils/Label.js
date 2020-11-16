import React from "react";

const Label = (props) => {
  return (
    <>
      <p style={{ margin: "5px", fontFamily: `"Roboto", sans-serif` }}>
        {props.children}
      </p>
    </>
  );
};

export default Label;
