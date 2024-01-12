import React, { useState, useEffect, useRef } from "react";

const Calculator = ({ config }) => {
  // const [expression, setExpression] = useState("3 - (2 / 4) * 3");
  const [expression, setExpression] = useState("");
  const [expressionResult, setExpressionResult] = useState("");
  const [parsedPrompt, setParsedPrompt] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [sequenceQueue, setSequenceQueue] = useState([]);
  const [sequenceFinished, setSequenceFinished] = useState(false);
  const delimiters = ["+", "-", "*", "/"];

  // const values = config.values || [];
  // const operation = config.operation || "";
  // setExpression(config.promptSequence);
  // const promptSequence = config.promptSequence;

  useEffect(() => {
    if (config && config.promptSequence) {
      var parsedSequence = parsePrompt(config.promptSequence);
      parsedSequence.push("=");
      console.log(parsedSequence);
      setSequenceQueue(parsedSequence);
      setExpressionResult("");
    }
  }, [config]);

  useEffect(() => {
    console.log(sequenceQueue);
    if (sequenceQueue.length > 0) {
      const intervalID = setInterval(() => {
        setActiveButton(sequenceQueue[0]);
        console.log(sequenceQueue[0]);

        // Check if current element is an arithmatic operator
        if (delimiters.includes(sequenceQueue[0])) {
          setExpressionResult(sequenceQueue[0]);
        } else {
          setExpressionResult((prev) =>
            !delimiters.includes(prev)
              ? prev + sequenceQueue[0]
              : sequenceQueue[0]
          );
        }
        const timeoutID = setTimeout(() => {
          setActiveButton(null);
        }, 250);

        setSequenceQueue((prev) => prev.slice(1));
      }, 400);

      setSequenceFinished(true);
      return () => clearInterval(intervalID);
    } else if (sequenceFinished) {
      // setExpressionResult(eval(config.promptSequence));
      setExpressionResult(eval(parsedPrompt));
    }
  }, [sequenceQueue]);

  const parsePrompt = (prompt) => {
    // Define a mapping from words to symbols
    const replacements = {
      plus: "+",
      "divided by": "/",
      divided: "/",
      multiply: "*",
      times: "*",
      subtract: "-",
      add: "+",
      minus: "-",
    };
    const replacedPrompt = prompt.replace(
      /\b(plus|divided by|divide|multiply|times|subtract|add|minus)\b/gi,
      (matched) => replacements[matched.toLowerCase()]
    );

    // Remove spaces and split the string into individual characters
    var final = replacedPrompt.replace(/\s/g, "");
    setParsedPrompt(final);
    return replacedPrompt.replace(/\s+/g, "").split("").filter(Boolean);
  };

  const handleButtonClick = (event) => {
    const value = event.target.innerText;

    switch (value) {
      // case "=":
      // parsePrompt("3+3-32/2");
      // break;
      case "AC":
        setExpression("");
        setExpressionResult("");
        break;
      case "+/-":
        setExpression("");
        setExpressionResult("");
        setExpression((prev) =>
          expression.startsWith("-") ? expression.slice(1) : "-" + expression
        );
        setExpressionResult((prev) =>
          expression.startsWith("-") ? expression.slice(1) : "-" + expression
        );
        break;
      case "=":
        try {
          setExpression(eval(expression).toString());
          setExpressionResult(eval(expression).toString());
        } catch (e) {
          setExpression("Error");
          setExpressionResult("Error");
        }
        break;
      default:
        setExpression((prev) => prev + value);
        setExpressionResult((prev) => prev + value);
    }
  };

  return (
    <div className="calculator_section">
      <h1 className="app_title">CALCULATOR</h1>
      <input
        className="expression_field"
        type="text"
        // value={`${values[0]} ${operation} ${values[1]} = ${eval(
        //   values[0].toString() + operation + values[1].toString()
        // )}`}
        // value={eval(values[0].toString() + operation + values[1].toString())}
        value={expressionResult}
        // onChange={(e) => calculation(e.target.value)}
        // placeholder="Enter Expression:"
        disabled
      />
      <div className="calculator_operations">
        <button
          className={activeButton === "AC" ? "active" : ""}
          onClick={handleButtonClick}
        >
          AC
        </button>
        <button
          className={activeButton === "+/-" ? "active" : ""}
          onClick={handleButtonClick}
        >
          +/-
        </button>
        <button
          className={activeButton === "%" ? "active" : ""}
          onClick={handleButtonClick}
        >
          %
        </button>
        {/* <button onClick={handleButtonClick}>÷</button> */}
        <button
          className={activeButton === "/" ? "active" : ""}
          onClick={handleButtonClick}
        >
          /
        </button>
        <br />
        <button
          className={activeButton === "7" ? "active" : ""}
          onClick={handleButtonClick}
        >
          7
        </button>
        <button
          className={activeButton === "8" ? "active" : ""}
          onClick={handleButtonClick}
        >
          8
        </button>
        <button
          className={activeButton === "9" ? "active" : ""}
          onClick={handleButtonClick}
        >
          9
        </button>
        <button
          className={activeButton === "*" ? "active" : ""}
          onClick={handleButtonClick}
        >
          *
        </button>
        <br />
        <button
          className={activeButton === "4" ? "active" : ""}
          onClick={handleButtonClick}
        >
          4
        </button>
        <button
          className={activeButton === "5" ? "active" : ""}
          onClick={handleButtonClick}
        >
          5
        </button>
        <button
          className={activeButton === "6" ? "active" : ""}
          onClick={handleButtonClick}
        >
          6
        </button>
        <button
          className={activeButton === "-" ? "active" : ""}
          onClick={handleButtonClick}
        >
          -
        </button>
        <br />
        <button
          className={activeButton === "1" ? "active" : ""}
          onClick={handleButtonClick}
        >
          1
        </button>
        <button
          className={activeButton === "2" ? "active" : ""}
          onClick={handleButtonClick}
        >
          2
        </button>
        <button
          className={activeButton === "3" ? "active" : ""}
          onClick={handleButtonClick}
        >
          3
        </button>
        <button
          className={activeButton === "+" ? "active" : ""}
          onClick={handleButtonClick}
        >
          +
        </button>
        <br />
        <button
          className={activeButton === "0" ? "active" : ""}
          onClick={handleButtonClick}
        >
          0
        </button>
        <button
          className={activeButton === "." ? "active" : ""}
          onClick={handleButtonClick}
        >
          .
        </button>
        <button
          className={activeButton === "=" ? "active" : "equals_button"}
          onClick={handleButtonClick}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
