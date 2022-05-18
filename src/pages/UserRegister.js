import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockForm from "../components/StockForm";

const UserRegister = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(localStorage.getItem("isAdmin"));
  }, []);

  const errRef = useRef();

  const inputs = [
    {
      id: 1,
      name: "username",
      placeholder: "Please Enter Your Username",
      label: "Username :",
      type: "text",
      required: true,
      errorMessage:
        "Username should start with an letter, it should contain 4-16 characters !",
      pattern: "^[A-Za-z][A-Za-z0-9_]{4,16}$",
    },
    {
      id: 2,
      name: "password",
      placeholder: "Enter Your Password",
      label: "Password :",
      type: "password",
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 3,
      placeholder: "Confirm Password",
      pattern: values.password,
      errorMessage: "Passwords do not match",
      label: "Confirm Password :",
      required: true,
      type: "password",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await axios.post("http://localhost:3500/register", values, {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    });
    // setValues({ username: "", password: "" });
    navigate("/baselayout");
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>User Register Form</h1>
        <p ref={errRef} className={admin === "true" ? "offscreen" : "errmsg"}>
          Sorry Only Admins are Authorized to Add New Users !
        </p>
        {inputs.map((input) => {
          return (
            <StockForm
              {...input}
              key={input.id}
              value={values[input.name]}
              onChange={handleChange}
            />
          );
        })}
        <div className="radiotwo">
          <label>isAdmin :</label>
          <div className="radio">
            <input
              type="radio"
              name="isAdmin"
              style={{ cursor: "pointer" }}
              value={false}
              onChange={handleChange}
              checked={values.isAdmin === false}
            />
            <label style={{ padding: "4px" }}>false</label>
            <input
              type="radio"
              name="isAdmin"
              style={{ cursor: "pointer" }}
              value={true}
              onChange={handleChange}
              checked={values.isAdmin === true}
            />
            <label style={{ padding: "4px" }}>true</label>
          </div>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
