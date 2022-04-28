import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productSelectOptions } from "../../adapters/productAdapter";

export const ProductionLabel = () => {

  let {id: orderId} = useParams();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  

    // hooks and redux
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [orderdetails, setOrderDetails] = useState(null);
  
  
    const fetchOrder = async (orderId) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}`
        // `https://stepsolutionapi.herokuapp.com/orders/${orderId}`
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
    }, []);

  return (
    
    // <div className="mt-5 d-flex justify-content-center align-items-center">
      <div  ref={componentRef} className=" rounded  p-sm-3" >
        <h1 className="mb-3 text-center border "  >{orderdetails?.customer.company}</h1>
            <Row className="mb-3">
              <Col>PO /Job Name:</Col>
              <Col className="fw-bold">{orderdetails?.poName}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Date</Col>
              <Col className="fw-bold">{orderdetails?.createdAt}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Route</Col>
              <Col className="fw-bold">{orderdetails?.shippingRoute}</Col>
            </Row>
            <hr />
              <Table bordered responsive='md' className='table print-table'>
                 <thead>
                  <tr>  
                      <th scope='col'>#</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Qty</th>
                      <th scope='col'>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orderdetails?.orderItems.map((orderItem, index) => (
                          <tr key={orderItem.id}>
                            <td>{index}</td>
                            <td>{orderItem?.name}</td>
                            <td>{orderItem?.quantity}</td>
                            <td>{orderItem?.notes}</td>
                          </tr>
                        ))}
                  </tbody>

              </Table>
              
              <Row className="m-5">
              <Button 
                onClick={handlePrint}
              variant="dark" type='submit' className="printer-btn" >
                Print
              </Button>
           
              </Row>
           
      </div>
    // </div>
  );
};


