import React, { useState } from "react";
import { defaultStyle } from "./CustomResponseComponentDatePicker";

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentQuestionTextbox({ instance }) {
  const [hover, setHover] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Geben Sie bitte ihre Frage ein
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <textarea
            style={{ marginBottom: "20px", height: "5em" }}
            placeholder="Ihre Feedback"
            onChange={(e) => setText(e.target.value)}
          />
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Geben Sie bitte ihre Email ein
          </p>
          <input
            style={{ marginBottom: "20px" }}
            type={"email"}
            placeholder="Ihre Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onClick={() => {
              fetch(`http://localhost:4000/api/question/${text}/${email}`, {
                method: "POST",
              })
                .then(() => {
                  send(instance, "Question wurde erfolgreich eingetragen");
                }) //
                .catch(() => {
                  send(instance, "Question eintragung ist fehlgeschlagen");
                });
            }}
          >
            Schicken
          </button>
        </div>
      </div>
    </>
  );
}

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

export default CustomResponseComponentQuestionTextbox;
