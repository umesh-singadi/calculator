/* eslint-disable react/prop-types */
import React from "react";
import "./App.css";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";

const operators = ["AC", "/", "x", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatedData, setCalculatedData] = React.useState("");

  function handleSubmit() {
    const result = eval(calculatedData);

    setCalculatedData(`${result}`);
    setOutput(`${result}`);
    setInput(`${result}`);
  }
  function handleClear() {
    setInput("0");
    setCalculatedData("");
    setOutput("");
  }
  function handleNumber(value) {
    const newInput =
      input.length === 0 || input === "0" ? String(value) : `${input}${value}`;
    const newCalculatedData =
      calculatedData.length === 0 || calculatedData === "0"
        ? String(value)
        : `${calculatedData}${value}`;
    setInput(newInput);
    setCalculatedData(newCalculatedData);
  }
  function dotOperator() {
    const lastChar = calculatedData[calculatedData.length - 1];

    if (calculatedData.length === 0) {
      setInput("0.");
      setCalculatedData("0.");
    } else {
      const isLastOperator = operators.includes(lastChar);
      const hasDecimalAlready = lastChar === "." || input.includes(".");

      if (isLastOperator || hasDecimalAlready) {
        setInput("0.");
        setCalculatedData(`${calculatedData} 0.`);
      } else {
        setInput(hasDecimalAlready ? input : input + ".");
        const updatedCalculation = hasDecimalAlready
          ? calculatedData
          : calculatedData + ".";
        setCalculatedData(updatedCalculation);
      }
    }
  }
  function handleOperator(value) {
    if (calculatedData.length > 0) {
      const lastCharacter = calculatedData.slice(-1);
      const secondLastCharacter = calculatedData.slice(-2, -1);
      const isLastCharacterOperator = operators.includes(lastCharacter);
      const isSecondLastCharacterOperator =
        operators.includes(secondLastCharacter);
      const operator = value === "x" ? "*" : value;

      if (isLastCharacterOperator && value !== "-") {
        if (isSecondLastCharacterOperator) {
          setCalculatedData(calculatedData.slice(0, -2) + operator);
        } else {
          setCalculatedData(calculatedData.slice(0, -1) + operator);
        }
      } else {
        setCalculatedData(calculatedData + operator);
      }
      setInput(operator);
    }
  }

  function handleInput(value) {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumber(number);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperator(operator);
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    function handleOutput() {
      setOutput(calculatedData);
    }

    handleOutput();
  }, [calculatedData]);
  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
