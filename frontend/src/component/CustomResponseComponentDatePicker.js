import React, { useState } from "react";
import PropTypes from "prop-types";

export const defaultStyle = {
  normal: {
    backgroundColor: "#3cc1b7",
    border: "none",
    color: "#011f3",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
  },
  hover: {
    backgroundColor: "#1c5569",
    color: "#ffffff",
    textDecoration: "underline",
  },
};

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
    <select className="options">
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
function CustomResponseComponentDatePicker({ message, instance }) {
  const [datePickerElement, setDatePickerElement] = useState(null);
  const [text, setText] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const fieldDidChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      {datePickerElement && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5px",
            }}
          >
            <Label text={"Vorname"}></Label>
            <input
              type="text"
              name="firstName"
              onChange={fieldDidChange}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5px",
            }}
          >
            <Label text={"Nachname"}></Label>
            <input
              type="text"
              name="lastName"
              onChange={fieldDidChange}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5px",
            }}
          >
            <Label text={"Email"}></Label>

            <input type="email" name="email" onChange={fieldDidChange}></input>
          </div>

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
                  setDateValue(v.target.value);
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
                  setTimeValue(v.target.value);
                }}
                required
              ></input>
            </div>
          </div>
        </div>
      )}

      {/* This is where the date picker popup will appear. */}
      <div
        ref={setDatePickerElement}
        style={{ position: "relative", margin: 10 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5px",
        }}
      >
        <Label text={"Thema"}></Label>
        <Selectbox options={options}></Selectbox>
      </div>
      <div
        ref={setDatePickerElement}
        style={{ position: "relative", margin: 10 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5px",
        }}
      >
        <Label text={"Beschreibung"}></Label>
        <textarea
          style={{ marginBottom: "20px", height: "5em" }}
          placeholder="Ihre Beschreibung"
          onChange={(e) => setText(e.target.value)}
        />{" "}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <div
          ref={setDatePickerElement}
          style={{ position: "relative", margin: 10 }}
        />

        <button
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          style={{
            ...defaultStyle.normal,
            ...(hover ? defaultStyle.hover : null),
          }}
          onClick={async () => {
            if (
              timeValue &&
              dateValue &&
              values.firstName &&
              values.lastName &&
              values.email
            ) {
              const selectboxs = document.getElementsByClassName("options");
              const selectboxValue = selectboxs[selectboxs.length - 1].value;
              fetch(
                `http://localhost:4000/api/calender/${timeValue}/${dateValue}/${values.firstName}/${values.lastName}/${values.email}/${selectboxValue}/${text}`,
                {
                  method: "POST",
                }
              )
                .then(() => {
                  send(instance, "Termin Erfolgreich Eingetragen");
                })
                .catch(() => {
                  send(instance, "Termin Eintragung schlägtfehl");
                });
            } else {
              console.log("Error");
            }
          }}
        >
          Schicken
        </button>
      </div>
    </>
  );
}

CustomResponseComponentDatePicker.propTypes = {
  message: PropTypes.object,
  instance: PropTypes.object,
};

function send(instance, message) {
  const sendObject = {
    input: {
      message_type: "text",
      text: message,
    },
  };
  const sendOptions = {
    silent: true,
  };
  instance.send(sendObject, sendOptions).catch(function (error) {
    console.error("This message did not send!");
  });
}

export default CustomResponseComponentDatePicker;
