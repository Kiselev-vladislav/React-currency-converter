import React, { useState, useEffect, useRef } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  // const [rates, setRates] = useState({});

  const ratesRef = useRef({});

  // useEffect(() => {
  //   fetch(
  //     `https://api.apilayer.com/fixer/latest?base=${fromCurrency}&apikey=ELn79NtVAbnwRjKslGuq6X2ol2bGRZpE`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       ratesRef.current = json.rates;
  //       onChangeToPrice(1);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //       alert("Не удалось получить информацию");
  //     });
  // }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value.toFixed(3));
    setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
