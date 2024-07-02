/* eslint-disable react/prop-types */
import React from "react";
import "./App.css";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
const operators = ["AC", "/", "x", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard setInput={setInput} />
      </div>
    </div>
  );
}

export default App;
