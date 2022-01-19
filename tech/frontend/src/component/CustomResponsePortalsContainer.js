import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CustomResponseComponentDatePicker from "./CustomResponseComponentDatePicker";
import CustomResponseComponentFeedback from "./CustomResponseComponentFeedback";
import CustomResponseComponentFeedbackTextbox from "./CustomResponseComponentFeedbackTextbox";
import CustomResponseComponentQuestionTextbox from "./CustomResponseComponentQuestionTextbox";
import CustomResponseComponentDatePickerDialog from "./CustomResponseComponentDatePickerDialog";
//CustomResponseComponentSelectboxDialog
import CustomResponseComponentSelectboxDialog from "./CustomResponseComponentSelectboxDialog";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

//Appointment Data
let firstname;
let lastname;
let email;
let date;
let time;
let theme;
let description;

let responeText;
let chatbot;

export const chat = [];

export function setDate(dateValue) {
  date = dateValue;
}

export function setTime(timeValue) {
  time = timeValue;
}

export function setTheme(themeValue) {
  theme = themeValue;
}

/**
 * We need to use a component here because the "customResponseHandler" is registered only once on the chat instance
 * and it needs to be able to access the previous state so it can add elements to it. You can't do that using react
 * hooks since any callbacks have to be recreated if their dependencies change.
 */
function CustomResponsePortalsContainer({ instance }) {
  // This state will be used to record all of the custom response events that are fired from the widget.
  // These events contain the HTML elements that we will attach our portals to as well as the messages that we wish to
  // render in the message.
  const [customResponseEvents, setCustomResponseEvents] = useState([]);

  // When the component is mounted, register the custom response handler that will store the references to the custom
  // response events.
  useEffect(() => {
    //fontawsome
    library.add(faExternalLinkAlt);

    //set chatbot
    chatbot = instance;

    // This handler will fire each time a custom response occurs and we will update our state by appending the event
    // to the end of our elements list.
    function customResponseHandler(event) {
      // Use functional updates since the state is computed and we can get the previous value of the events array.
      // Passing in a reference to customResponseEvents and concatenating to it will not work since this function will
      // capture the initial value of customResponseEvents, which is empty, and not updates made to it.
      setCustomResponseEvents((eventsArray) => {
        return eventsArray.concat(event);
      });
    }

    instance.on({ type: "pre:receive", handler: handleRespone });

    instance.on({ type: "pre:send", handler: handleRequst });

    instance.on({ type: "customResponse", handler: customResponseHandler });

    // Remove the custom response handler.
    return () => {
      instance.off({ type: "customResponse", handler: customResponseHandler });
    };
  }, [instance]);

  // All we need to do to enable the React portals is to render each portal somewhere in your application (it
  // doesn't really matter where).
  return (
    <>
      {customResponseEvents.map(function mapEvent(event, index) {
        const templateName = event.data.message.user_defined.template_name;
        return (
          // eslint-disable-next-line
          <CustomResponseComponentPortal
            children={handleTemplate(templateName, instance)}
            hostElement={event.data.element}
          ></CustomResponseComponentPortal>
        );
      })}
    </>
  );
}

CustomResponsePortalsContainer.propTypes = {
  instance: PropTypes.object.isRequired,
};

/**
 * This is the component that will attach a React portal to the given host element. The host element is the element
 * provided by the chat widget where your custom response will be displayed in the DOM. This portal will attached
 * any React children passed to it under this component so you can render the response using your own React
 * application. Those children will be rendered under the given element where it lives in the DOM.
 */
function CustomResponseComponentPortal({ hostElement, children }) {
  return ReactDOM.createPortal(children, hostElement);
}

function handleRespone(event) {
  responeText = event?.data?.output?.generic[0]?.text;
  let text = event?.data?.output?.generic[0]?.text;
  addChatFromBot(event);
  if (isLink(text)) {
    handleLink(event);
  } else if (text === "Wählen Sie bitte Datum und Zeit") {
    responeText = "";
    send(chatbot, "datum_kompo");
  } else if (text === "Wählen Sie bitte das Thema") {
    responeText = "";
    send(chatbot, "thema_kompo");
  } else if (
    text ===
    "Bitte beantworten Sie die Fragen, um den Termin richtig einzutragen und Ihnen später per Email zu kontaktieren "
  ) {
    responeText = "";
    send(chatbot, "vorname");
  }
}

function handleRequst(event) {
  const text = event.data.input.text;
  addChatFromUser(event);
  if (isAppointment() && text !== "Abbrechen") {
    handleAppointment(event);
  }
}

function isLink(respone) {
  return respone && respone.includes("LINK_START{");
}

function handleLink(event) {
  let text = event?.data?.output?.generic[0]?.text;
  const link = text.substring(
    text.indexOf("LINK_START{") + 11,
    text.indexOf("}LINK_END")
  );
  const linkText = text.substring(
    text.indexOf("LINK_TEXT_START{") + 16,
    text.indexOf("}LINK_TEXT_END")
  );

  const textBeforLink = text.substring(0, text.indexOf("LINK_START{")) + " ";
  const textAfterLink =
    " " + text.substring(text.indexOf("}LINK_TEXT_END") + 14, text.length);

  event.data.output.generic[0].text = `${textBeforLink} <a target="_blank" rel="noopener noreferrer" href=${link}>${linkText} <i style="width:1em" class="fas fa-external-link-alt"></i></a> ${textAfterLink}`;
}

function handleTemplate(value, instance) {
  switch (value) {
    case "date_picker":
      return <CustomResponseComponentDatePicker instance={instance} />;
    case "feedback":
      return <CustomResponseComponentFeedback instance={instance} />;
    case "feedback_textbox":
      return <CustomResponseComponentFeedbackTextbox instance={instance} />;
    case "question":
      return <CustomResponseComponentQuestionTextbox instance={instance} />;
    case "data-picker_dialog":
      return <CustomResponseComponentDatePickerDialog instance={instance} />;
    case "thema_dialog":
      return <CustomResponseComponentSelectboxDialog instance={instance} />;
  }
}

function isAppointment() {
  switch (responeText) {
    case "Geben Sie bitte Ihre Vorname ein":
      return true;
    case "Geben Sie bitte Ihre Nachname ein":
      return true;
    case "Geben Sie bitte Ihre Email ein":
      return true;
    case "Wählen Sie bitte die Datum und Zeit":
      return true;
    case "data-picker_dialog":
      return true;
    case "Wählen Sie bitte das Thema":
      return true;
    case "thema_dialog":
      return true;
    case "Geben Sie bitte die Beschreibung ein":
      return true;
    default:
      return false;
  }
}

function handleAppointment(event) {
  let input = event.data.input.text;
  switch (responeText) {
    case "Geben Sie bitte Ihre Vorname ein":
      firstname = input;
      event.data.input.text = "nachname";
      break;
    case "Geben Sie bitte Ihre Nachname ein":
      lastname = input;
      event.data.input.text = "email";
      break;
    case "Geben Sie bitte Ihre Email ein":
      email = input;
      event.data.input.text = "datum";
      break;
    case "Geben Sie bitte die Beschreibung ein":
      description = input;
      fetch(
        `http://localhost:4000/api/calender/${time}/${date}/${firstname}/${lastname}/${email}/${theme}/${description}`,
        {
          method: "POST",
        }
      )
        .then(() => {
          send(chatbot, "Termin Erfolgreich Eingetragen");
        })
        .catch(() => {
          send(chatbot, "Termin Eintragung schlägtfehl");
        });
      event.data.input.text = "bearbeitung";
      break;
  }
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

function addChatFromUser(event) {
  const history = event.data.history.label;
  const text = event.data.input.text;
  chat.push({
    name: "benutzer",
    text: history ? history : text,
  });
}

function addChatFromBot(event) {
  const generic = event?.data?.output?.generic;
  if (generic) {
    const text = searchForText(generic);
    const suggestions = searchForSuggestion(generic);
    chat.push({
      name: "chatbot",
      text: text,
      suggestions: suggestions,
    });
  }
}

function searchForText(generic) {
  let text = undefined;
  generic.forEach((element) => {
    if (element.response_type) {
      if (element.response_type === "text") {
        text = element.text;
      }
    }
  });

  return text;
}

function searchForSuggestion(generic) {
  let suggestion = [];
  generic.forEach((element) => {
    if (element.response_type) {
      if (element.response_type === "suggestion") {
        element.suggestions.forEach((s) => {
          suggestion.push(s.label);
        });
      }
    }
  });

  return suggestion;
}

export default CustomResponsePortalsContainer;
