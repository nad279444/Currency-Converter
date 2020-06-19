import React, { useEffect,useState } from 'react';
import './App.css';
import Currency from './Currency';

const BASE_URL ='https://api.exchangeratesapi.io/latest'



const App = () => {
  const [currencyOptions,setcurrencyOptions] = useState([])
  const [fromCurrency,setFromCurrency] = useState()
  const [toCurrency,setToCurrency] = useState()
  const [exchangeRate,setExchangeRate] = useState()
  const [ amount,setAmount] = useState(1)
  const [amountInFromCurrency,setAmountinFromCurrency] = useState(true)



  let toAmount,fromAmount;
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else{
    toAmount = amount 
    fromAmount = toAmount / exchangeRate
  }
  


  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setcurrencyOptions([data.base,...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])

   useEffect(() => {
     if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
     }
   },[fromCurrency,toCurrency])
     
     

 function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountinFromCurrency(true)

  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountinFromCurrency(false)

  }

  return ( 
    <>
    <h1>Currency Converter</h1>
    <h3> Convert </h3>
    <Currency 
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      amount = {fromAmount}
      onChangeAmount={handleFromAmountChange}/>

    <div className="equal"> = </div>

    <Currency
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange}/> 
    </>
   );
}
 
export default App;