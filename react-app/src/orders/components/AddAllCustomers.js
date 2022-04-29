import React from "react";


// redux and custom hook imports

import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../../store/orders";


export const AddAllCustomers = ({ user, userId }) => {

  // hooks and redux
  const customer = useSelector((state) => state.orders.customer);
  const dispatch = useDispatch();
  



  // async function to create customer
  const createCustomer = async (customerData) => {
    // const dto = createCustomerDto(customer);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (response.ok) {
      const data = await response.json();
      // call redux dispatch, it set customer also in store
      dispatch(setCustomer(dto));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  return (
     <></> );

