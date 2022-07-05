import React, { createContext, useState } from "react";
import Calc from "./components/Calc";
import Screen from "./components/Screen";
import Board from "./components/Board";
import Button from "./components/Button";
import Footer from "./components/Footer";
import './App.scss'

export const ThemeContext = createContext(null);

const btnValues = [
  ["C", "AC", "÷"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, '00', ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((curr) => curr === 'light' ? 'dark' : 'light');
  }

  const [style, setStyle] = useState('standard');
  const toggleStyle = () => {
    setStyle((curr) => curr === 'standard' ? 'retro' : 'standard');
  }

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "÷"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className={style}>
      <div className="switches-container">
            <label className="switch" htmlFor='darkmode'> 
              <p>Dark mode</p>
                <input type='checkbox' id="darkmode" onClick={toggleTheme} checked={theme === 'dark'} />
                <span className='slider round'></span>
            </label>

            <label className="switch" htmlFor='stylemode'> 
              <p>Retro mode</p>
                <input type='checkbox' id="stylemode" onClick={toggleStyle} checked={style === 'retro'} />
                <span className='slider round'></span>
            </label>
        </div>


        <Calc>
          <Screen value={calc.num ? calc.num : calc.res} />
          <Board>
            {btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C" || btn === "AC"
                      ? resetClickHandler
                      : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn === "÷" || btn === "x" || btn === "-" || btn === "+"
                      ? signClickHandler
                      : btn === "."
                      ? commaClickHandler
                      : numClickHandler
                  }
                />
              );
            })}
          </Board>
          <Footer />
        </Calc>

      </div>
    </ThemeContext.Provider>
  );
};

export default App;