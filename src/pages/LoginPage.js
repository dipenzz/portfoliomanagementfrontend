import { useRef, useState } from "react";
import Form from "../components/Form";
import "../App.css";

import axios from "../api/axios";

import useAuth from "../hooks/useAuth";
import {
  // useLocation,
  useNavigate,
} from "react-router-dom";

function LoginPage() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/"; // where they came from

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const inputs = [
    {
      id: 1,
      name: "username",
      placeholder: "Enter Your Username.",
      label: "Username :",
      type: "text",
    },
    {
      id: 2,
      name: "password",
      placeholder: "Enter Your Password",
      label: "Password :",
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

    try {
      const response = await axios.post(
        "/auth",
        values
        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
      );

      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const isAdmin = response?.data?.isAdmin;
      localStorage.setItem("accessToken", "Bearer " + accessToken);
      localStorage.setItem("isAdmin", isAdmin);
      setAuth({ values, isAdmin, accessToken });
      // navigate(from, { replace: true });
      navigate("/baselayout");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized !");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="appTwo">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Login Form </h1>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          {inputs.map((input) => {
            return (
              <Form
                {...input}
                value={values[input.name]}
                key={input.id}
                onChange={handleChange}
              />
            );
          })}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
