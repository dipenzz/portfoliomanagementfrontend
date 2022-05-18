import React, { useState } from "react";
import "../css/stockForm.css";

const StockForm = (props) => {
  const [focus, setFocus] = useState(false);
  const handleBlur = () => {
    setFocus(true);
  };
  const { errorMessage, label, value, onChange, ...input } = props;
  return (
    <div className="stockFormInput">
      <label>{label}</label>
      <input
        {...input}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() => {
          input.name === "confirmpassowrd" && setFocus(true);
        }}
        focused={focus.toString()}
      />
      <span className="errorFormMessage">{errorMessage}</span>
    </div>
  );
};

export default StockForm;
