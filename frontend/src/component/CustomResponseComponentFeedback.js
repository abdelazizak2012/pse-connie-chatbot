import React, { useState } from "react";
import PropTypes from "prop-types";
import { chat } from "./CustomResponsePortalsContainer";

function IconComponent({ instance, message, iconName, hoverColor, sendChat }) {
  const [hover, setHover] = useState(false);

  const defaultStyle = {
    normal: {
      width: "3em",
      cursor: "pointer",
      marginRight: "20px",
      color: "black",
    },
    hover: {
      color: hoverColor,
    },
  };

  return (
    <span
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
        console.log(JSON.stringify(chat));
        if (sendChat) {
          fetch(`http://localhost:4000/api/chat`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({"chat": chat}),
          }).then(() => console.log("feedback saved"));
        }

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
      }}
    >
      <i
        style={{ width: "3em", cursor: "pointer", marginRight: "20px" }}
        className={iconName}
      ></i>
    </span>
  );
}

IconComponent.propTypes = {
  instance: PropTypes.object,
  message: PropTypes.object,
  iconName: PropTypes.object,
  hoverColor: PropTypes.object,
  sendChat: PropTypes.object,
};

/**
 * Your custom response component can also make use of the message object if you have set "user_defined" variables.
 */
function CustomResponseComponentFeedback({ instance }) {
  return (
    <>
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Sind Sie mit meinem Service zufrieden?
      </p>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <IconComponent
          instance={instance}
          message={"Bewertung_1"}
          iconName={"far fa-smile-beam"}
          hoverColor={"#46c764"}
          sendChat={false}
        />
        <IconComponent
          instance={instance}
          message={"Bewertung_2"}
          iconName={"far fa-meh"}
          hoverColor={"#4677c7"}
          sendChat={true}
        />
        <IconComponent
          instance={instance}
          message={"Bewertung_3"}
          iconName={"far fa-frown"}
          hoverColor={"#c74646"}
          sendChat={true}
        />
      </div>
    </>
  );
}

CustomResponseComponentFeedback.propTypes = {
  instance: PropTypes.object,
};

export default CustomResponseComponentFeedback;
