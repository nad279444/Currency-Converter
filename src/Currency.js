import React from 'react';

const Currency = (props) => {
    const { currencyOptions,selectedCurrency,onChangeCurrency,amount,onChangeAmount } = props
    return ( 
       <div>
           <input
            type="number" 
            className="input" 
            value={amount}
            onChange={onChangeAmount}
            />
           <select 
                value={selectedCurrency}
                onChange={onChangeCurrency}>
               {currencyOptions.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
               ))}
               
           </select>
       </div> 
     );
}
 
export default Currency;
