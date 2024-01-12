// import Button from "./Button.js";
import React, { useState, useEffect, useRef } from "react";

// Components Dict
// {"Plus Button": "A button that increments the counter variable,
//  "Minus Button": "A button that decrements the counter variable}
// Components Dict

const AccountForm = ({ config }) => {
  const [count, setCount] = useState(0);
  const [textPrompt, setTextPrompt] = useState(0);
  const [selectedOption, setSelectedOption] = useState("option1");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // const [preference, setPreference] = useState("");
  const [email, setEmail] = useState("");

  const typingDelay = 80;
  // const name = config.Name || "";
  // const address = config.Address || "";
  // const preference = config.Preference || "";

  useEffect(() => {
    setName("");
    setAddress("");
    // setPreference("");
    setEmail("");
    console.log("AW YEAH", config);
    if (config.Name) {
      let indexName = 0;
      let indexAddress = 0;
      let indexPreference = 0;
      let indexEmail = 0;
      setName((prev) => prev + config.Name[indexName]);
      setAddress((prev) => prev + config.Address[indexAddress]);
      // setPreference((prev) => prev + config.Preference[indexPreference]);
      setEmail((prev) => prev + config.Email[indexEmail]);

      const interval = setInterval(() => {
        setName((prev) =>
          indexName < config.Name.length ? prev + config.Name[indexName] : prev
        );
        setAddress((prev) =>
          indexAddress < config.Address.length
            ? prev + config.Address[indexAddress]
            : prev
        );
        // setPreference((prev) =>
        //   indexPreference < config.Preference.length
        //     ? prev + config.Preference[indexPreference]
        //     : prev
        // );
        setEmail((prev) =>
          indexEmail < config.Email.length
            ? prev + config.Email[indexEmail]
            : prev
        );
        indexName++;
        indexAddress++;
        indexPreference++;
        indexEmail++;

        // if (config && indexName == config.Name.length - 1) {
        // clearInterval(interval);
        // }
      }, typingDelay);

      return () => clearInterval(interval);
    }
  }, [config]);

  const SelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="account_info_form">
      <h1 className="app_title">ACCOUNT INFO FORM</h1>
      <div>
        <label for="name">NAME</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label for="address">ADDRESS</label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder=""
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        {/* <label for="preference">PREFERENCE</label>
        <input
        id="preference"
        name="preference"
        type="text"
        placeholder=""
        value={preference}
      /> */}
        <label for="preference">EMAIL</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <select
          value={selectedOption}
          name="preference"
          className="preference_select"
          placeholder="Preference"
          onChange={SelectOption}
        >
          <option value="option1">Mr</option>
          <option value="option2">Mrs</option>
          <option value="option3">Other</option>
        </select> */}
        {/* <input
          id="preference"
          name="preference"
          type="text"
          placeholder="Preference"
        /> */}
      </div>
    </div>
  );
};

const Button = ({ onClick, symbol }) => {
  return (
    <div className="Button">
      <button className="buttons" onClick={() => onClick(symbol)}>
        {symbol}
      </button>
    </div>
  );
};

export default AccountForm;
