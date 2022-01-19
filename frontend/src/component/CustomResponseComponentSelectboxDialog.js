import React from "react";
import PropTypes from "prop-types";
import { setTheme } from "./CustomResponsePortalsContainer";

const options = ["Generell", "Job", "Produkt"];

function Label({ text }) {
  return (
    <label
      style={{
        fontFamily: "Arial",
        fontWeight: "bold",
      }}
    >
      {text}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.object,
};

function Selectbox({ options }) {
  return (
    <select className="options" onChange={(v) => setTheme(v.target.value)}>
      {options.map((option) => {
        return <option value={option}>{option}</option>;
      })}
    </select>
  );
}

Selectbox.propTypes = {
  options: PropTypes.object,
};

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentSelectboxDialog({ message, instance }) {
  return (
    <>
      <div style={{ display: "flex", margin: "5px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "5px",
          }}
        >
          <Label text={"Thema"}></Label>
          <Selectbox options={options}></Selectbox>
        </div>
      </div>
    </>
  );
}

CustomResponseComponentSelectboxDialog.propTypes = {
  message: PropTypes.object,
  instance: PropTypes.object,
};

export default CustomResponseComponentSelectboxDialog;
