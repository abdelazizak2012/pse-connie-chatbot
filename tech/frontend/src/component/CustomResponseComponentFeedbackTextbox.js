import React, { useState } from "react";
import PropTypes from "prop-types";
import { defaultStyle } from "./CustomResponseComponentDatePicker";

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentFeedbackTextbox({ instance }) {
  const [hover, setHover] = useState(false);
  const [text, setText] = useState("");

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Es tut mir leid. Sie können gerne ein Feedback hinterlassen, die mir
          hilft, mich zu verbessern.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <textarea
            style={{ marginBottom: "20px", height: "5em" }}
            placeholder="Ihre Feedback"
            onChange={(e) => setText(e.target.value)}
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
              fetch(`http://localhost:4000/api/feedback/${text}`, {
                mode: "no-cors",
                method: "POST",
              });

              const sendObject = {
                input: {
                  message_type: "text",
                  text: "feedback_text",
                },
              };
              const sendOptions = {
                silent: true,
              };
              instance.send(sendObject, sendOptions).catch(function (error) {
                console.error("This message did not send!");
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

export default CustomResponseComponentFeedbackTextbox;
