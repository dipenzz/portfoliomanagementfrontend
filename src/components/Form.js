import React from "react";
import "../css/form.css";

const Form = (props) => {
  const { label, value, onChange, ...input } = props;
  return (
    <div>
      <div className="formInput">
        <label>{label}</label>
        <input {...input} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default Form;
