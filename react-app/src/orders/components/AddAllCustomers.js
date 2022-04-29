import React from "react";
import { Button } from "react-bootstrap";

import { useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";




import { customersArray } from "./CusomterArray";

console.log(customersArray[1]);

export const AddAllCustomers = ({ user, userId }) => {

customersArray.forEach(element => {
  
}); 

// const response = await fetch(`https://stepsolutionapi.herokuapp.com/customers`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(dto),
// });


  return (
     <>
     <Button >

       Add Customers to DB
     </Button>

     </> )};
