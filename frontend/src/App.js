import "./App.css";
import React, { useEffect, useState } from "react";
import CustomResponsePortalsContainer from "./component/CustomResponsePortalsContainer";

function App() {
  const [instance, setInstance] = useState(null);

  // Once the component has mounted, fire onLoadWebChatCallback to capture the widget instance.
  useEffect(() => {
    setChatbot((wacInstance) => {
      handlePrivacy(wacInstance);

    }, setInstance);
  }, []);
  return (
    <div className="App">
      {instance && <CustomResponsePortalsContainer instance={instance} />}
    </div>
  );
}
/**
 * Handles embedding web chat onto the page and firing a callback once the widget has been created.
 */
function onLoadWebChatCallback(callback) {
  window.watsonAssistantChatOptions = {
    integrationID: "c83734e3-8bd6-425d-b330-467ac45c8218", // The ID of this integration.
    region: "eu-de", // The region your integration is hosted in.
    serviceInstanceID: "08db642b-503b-40f5-ae0c-0983252925f6", // The ID of your service instance.
    onLoad: callback,
  };
  setTimeout(function () {
    const t = document.createElement("script");
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || "latest") +
      "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);


  
  });
}

function handlePrivacy(instance) {
  const widget = document
    .getElementById("WACContainer")
    .querySelector("#WACWidget");

  widget.querySelector(".WACBrandingBanner").style.display = "none";

  widget.querySelector(
    ".WAC__homeScreenOriginal-content.WAC__homeScreenOriginal-content--withStarters"
  ).style.display = "none";


  const texts = [
    "Hi there! We would love to talk with you. Under the EU General Data Protection Regulation, we need your approval for our use of personal information (e.g. your name and email address) you may provide as we communicate:",
    "<b>(1)</b> We'll store your personal information so that we can pick up the conversation if we talk later.",
    "<b>(2)</b> We may send you emails to follow up on our discussion here.",
    "<b>(3)</b> We may send you emails about our upcoming services and promotions.",
    "Is this okay with you?",
  ];

  const textContainer = document.createElement("div"); // is a node
  textContainer.id = "daten-schutz";
  textContainer.style.margin = "20px";
  textContainer.style.flex = "10";

  texts.forEach((t) => {
    const text = document.createElement("p"); // is a node
    text.innerHTML = t;
    text.style.margin = "10px";
    textContainer.appendChild(text);
  });

  widget.appendChild(textContainer);

  const buttonContainer = document.createElement("div"); // is a node
  buttonContainer.id = "buttons";
  buttonContainer.style.margin = "20px";
  buttonContainer.style.display = "flex";

  const button_1 = document.createElement("button"); // is a node
  button_1.className = "button_daten";
  button_1.innerText = "Yes, I Accept";
  button_1.style.margin = "20px";
  button_1.onclick = handleAccept;

  const button_2 = document.createElement("button"); // is a node
  button_2.className = "button_daten";
  button_2.innerText = "No, Not Now";
  button_2.style.margin = "20px";
  button_2.onclick = () => {
    instance.closeWindow();
    //  document.getElementById("daten-schutz").remove();
  };
  buttonContainer.appendChild(button_1);
  buttonContainer.appendChild(button_2);

  textContainer.appendChild(buttonContainer);
}

function handleAccept() {
  document.getElementById("daten-schutz").remove();
  const widget = document
    .getElementById("WACContainer")
    .querySelector("#WACWidget");

  widget.querySelector(
    ".WAC__homeScreenOriginal-content.WAC__homeScreenOriginal-content--withStarters"
  ).style.display = "unset";
}

function setChatbot(callback, setInstance) {
  onLoadWebChatCallback((wacInstance) => {
    setInstance(wacInstance);
    wacInstance.render();
    wacInstance.openWindow();
    setTimeout(() => {
      callback(wacInstance);
    }, 100);
  });
}

export default App;
