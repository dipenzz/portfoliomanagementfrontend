import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StockForm from "../components/StockForm";
import "../App.css";

const UpdateStock = () => {
  const [values, setValues] = useState({
    bankName: "",
    buyingRate: "",
    sellingRate: "",
    retailAmount: "",
  });

  const [ID, setID] = useState(null);

  useEffect(() => {
    setAdmin(localStorage.getItem("isAdmin"));
    setID(localStorage.getItem("ID"));
    setValues((prev) => {
      return {
        ...prev,
        bankName: localStorage.getItem("BankName"),
      };
    });
    setValues((prev) => {
      return {
        ...prev,
        sellingRate: localStorage.getItem("SellingRate"),
      };
    });
    setValues((prev) => {
      return {
        ...prev,
        buyingRate: localStorage.getItem("BuyingRate"),
      };
    });
    setValues((prev) => {
      return {
        ...prev,
        retailAmount: localStorage.getItem("RetailAmount"),
      };
    });
  }, []);

  const errRef = useRef();
  const [admin, setAdmin] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "bankName",
      placeholder: "Enter Stock Name",
      type: "text",
      label: "Stock Name :",
      required: true,
    },
    {
      id: 2,
      name: "buyingRate",
      placeholder: "Enter Buying Rate",
      type: "number",
      label: "Buying Rate :",
      required: true,
    },
    {
      id: 3,
      name: "sellingRate",
      placeholder: "Enter Selling Rate",
      type: "number",
      label: "Selling Rate :",
      required: true,
    },
    {
      id: 4,
      name: "retailAmount",
      placeholder: "Enter Retail Amount",
      type: "number",
      label: "Retail Amount :",
      required: true,
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
    await axios.patch(`http://localhost:3500/stocks/${ID}`, values, {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    });
  };

  return (
    <>
      <div className="app">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Stock Register</h1>
            <p
              ref={errRef}
              className={admin === "true" ? "offscreen" : "errmsg"}
            >
              Sorry Only Admins are Authorized to Update Stocks !
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
            <button className="btn" type="submit">
              Submit
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "firebrick" }}
              onClick={() => localStorage.setItem("Cancel", "cancel")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateStock;
