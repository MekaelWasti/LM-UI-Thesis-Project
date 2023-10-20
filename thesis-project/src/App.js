import logo from "./logo.svg";
import "./App.css";

import AccountForm from "./Components/AccountForm/AccountForm.js";
import Weather from "./Components/Weather/Weather.js";
import Calculator from "./Components/Calculator/Calculator.js";

// Audio
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setCommand,
  setCurrentApp,
  setConfig,
} from "./slices/commandInputSlice";

// import AudioRecorder from "./Components/AudioRecorder.js";

function App() {
  // Redux Toolkit
  const dispatch = useDispatch();
  const commandInput = useSelector((state) => state.commandInput);
  const [jsonInput, setJsonInput] = useState("");
  const [textPrompt, setTextPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  // Handle Prompt
  const managePrompt = (prompt) => {
    dispatch(setCommand(prompt));
    dispatch(setCommand(null));
  };

  const sendPrompt = async (e) => {
    if (e.key === "Enter") {
      let prompt = e.target.value;
      setPrompt(null);
      try {
        const formData = new FormData();
        formData.append("prompt", prompt);

        // const response = await fetch("http://127.0.0.1:8000/get_action", {
        const response = await fetch(
          "https://api.mekaelwasti.com:63030/get_action",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log("RESPONSE:", data);
        // managePrompt(data);

        try {
          const command = JSON.parse(data);
          if (command.CurrentApp) {
            dispatch(setCurrentApp(command.CurrentApp));
          }
          if (command.Config) {
            dispatch(setConfig(command.Config));
          }
          setJsonInput(""); // Reset the input after processing
        } catch (error) {
          console.log("Error parsing JSON", error);
        }

        setTextPrompt(data);
        setPrompt(data);
      } catch (err) {
        console.log("ERROR SENDING");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      try {
        const command = JSON.parse(jsonInput);
        if (command.CurrentApp) {
          dispatch(setCurrentApp(command.CurrentApp));
        }
        if (command.Config) {
          dispatch(setConfig(command.Config));
        }
        setJsonInput(""); // Reset the input after processing
      } catch (error) {
        console.log("Error parsing JSON", error);
      }
    }
  };

  // const sendPrompt = async (prompt) => {
  //   dispatch(setCommand(null));
  //   try {
  //     const formData = new FormData();
  //     formData.append("prompt", prompt);

  //     // const response = await fetch("http://127.0.0.1:8000/get_action", {
  //     const response = await fetch(
  //       "https://api.mekaelwasti.com:63030/get_action",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("RESPONSE:", data);
  //     // managePrompt(data);
  //     setTextPrompt(data);
  //     dispatch(setCommand(data));
  //   } catch (err) {
  //     console.log("ERROR SENDING");
  //   }
  // };

  // useEffect(() => {
  //   console.log("commandInput:", commandInput);
  // }, [commandInput]);

  // Handle Prompt

  let RenderedComponent;
  switch (commandInput.currentApp) {
    case "Weather":
      RenderedComponent = <Weather config={commandInput.config} />;
      break;
    case "AccountForm":
      RenderedComponent = <AccountForm config={commandInput.config} />;
      break;
    case "Calculator":
      RenderedComponent = <Calculator config={commandInput.config} />;
      break;
    default:
      // RenderedComponent = <Weather config={commandInput.config} />;
      RenderedComponent = <AccountForm config={commandInput.config} />;
  }

  return (
    <div className="App">
      <img className="background" src="Assets/background.png" alt="" />
      {/* <video
        className="background"
        autoPlay
        loop={true}
        muted={true}
        playsInline={true}
      >
        <source src="Assets/backgroundmesh.mp4" type="video/mp4" />
      </video> */}

      <div className="promptComponents">
        <input
          value={jsonInput}
          className="mainInputField"
          onChange={(e) => setJsonInput(e.target.value)}
          // onKeyDown={handleKeyPress}
          onKeyDown={(e) => sendPrompt(e)}
          placeholder="Enter Your Prompt"
          type="text"
        />
        {/* VOICE UI CONTROL */}
        {/* VOICE UI CONTROL */}
      </div>
      {/* <AccountForm commandInput={commandInput}></AccountForm> */}
      {/* <Weather commandInput={commandInput}></Weather> */}
      {/* <Calculator commandInput={commandInput}></Calculator> */}
      {RenderedComponent}

      {/* <VoiceRecorder></VoiceRecorder> */}
      {/* <h4>Record, Encode and Download Audio</h4> */}
      {/* <AudioRecorder></AudioRecorder> */}
    </div>
  );
}

export default App;
