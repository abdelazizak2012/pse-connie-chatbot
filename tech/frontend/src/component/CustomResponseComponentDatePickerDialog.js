import React, { useState } from "react";
import PropTypes from "prop-types";
import { setTime, setDate } from "./CustomResponsePortalsContainer";

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

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentDatePickerDialog({ message, instance }) {
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
          <Label text={"Datum"}></Label>

          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(v) => {
              setDate(v.target.value);
            }}
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label text={"Zeit"}></Label>

          <input
            type="time"
            id="appt"
            name="appt"
            onChange={(v) => {
              setTime(v.target.value);
            }}
            required
          ></input>
        </div>
      </div>
    </>
  );
}

CustomResponseComponentDatePickerDialog.propTypes = {
  message: PropTypes.object,
  instance: PropTypes.object,
};

export default CustomResponseComponentDatePickerDialog;
