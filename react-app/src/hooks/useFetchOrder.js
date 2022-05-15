import { useState, useEffect } from "react";

export const useFetchOrder = ({ orderId }) => {
  const [orderdetails, setOrderDetails] = useState("");
  const fetchOrder = async () => {
    console.log("running fetch order");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${orderId}`
    );
    if (response.ok) {
      const orderdetails = await response.json();
      setOrderDetails(orderdetails);
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  return { orderdetails, setOrderDetails, fetchOrder };
};
