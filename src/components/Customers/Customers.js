import React, { useEffect, useState } from "react";
import "./Customers.css";

import Amplify, { API } from "aws-amplify";

const myAPI = "apib783d7c2";
const path = "/customers";

const Customers = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      console.log("first");
      try {
        const response = await API.get(myAPI, path + "/" + inputValue);
        const jsonData = response; //= await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the API only if inputValue is not empty
    if (inputValue !== "") {
      fetchData();
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {data && <div style={{ maxWidth: "100px" }}>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default Customers;
