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

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentDatePicker({ message, instance }) {
  const [datePickerElement, setDatePickerElement] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [labelText, setLabelText] = useState();
  const [labelColor, setLabelColor] = useState("red");
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const fieldDidChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [hover, setHover] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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
            <label
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            >
              FirstName
            </label>
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
            <label
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            >
              Lastname
            </label>
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
            <label
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            >
              Email
            </label>
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
              <label
                style={{
                  fontFamily: "Arial",
                  fontWeight: "bold",
                }}
              >
                Datum
              </label>
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
              <label
                style={{
                  fontFamily: "Arial",
                  fontWeight: "bold",
                }}
              >
                Zeit
              </label>
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
          marginBottom: "10px",
        }}
      >
        <label
          style={{
            fontFamily: "Arial",
            fontWeight: "bold",
            color: labelColor,
            display: showWarning ? "unset" : "none",
          }}
        >
          {labelText}
        </label>
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
              fetch(
                `http://localhost:4000/api/calender/${timeValue}/${dateValue}/${values.firstName}/${values.lastName}/${values.email}`,
                {
                  mode: "no-cors",
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
              setLabelColor("red");
              setLabelText("Füllen Sie zuerst bitte alle Felder aus");
              setShowWarning(true);
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
