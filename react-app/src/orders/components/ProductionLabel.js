import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
import { useParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';


export const ProductionLabel = () => {

  let {id: orderId} = useParams();

  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // hooks and redux
  const [orderdetails, setOrderDetails] = useState(null);
  
  const fetchOrder = async (orderId) => {
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
  }, []);

  return (
      <div  ref={componentRef} className="rounded  p-sm-5">
        <h1 className="mb-3 text-center border border-dark p-3">{orderdetails?.order?.customer?.company}</h1>
        
        <h2 className="mb-3 text-center p-1">Order # {orderdetails?.order?.id}</h2>
        
        <Table bordered responsive='md' className='table print-table'>
          <thead>
            <tr>  
              <th className="col-4" scope='col'>Product</th>
              <th className="col-2 text-center" scope='col'>Qty</th>
              <th className="col-4" scope='col'>Notes</th>
            </tr>
          </thead>
            <tbody>
              {orderdetails?.products.map((orderItem, index) => (
                <tr key={orderItem.id}>
                  <td>{orderItem?.name}</td>
                  <td className="text-center">{orderdetails.order.orderItems[index]?.quantity}</td>
                  <td>{orderdetails.order.orderItems[index]?.notes}</td>
                </tr>
              ))}
            </tbody>
        </Table>
              
        <Row className="mb-3">
          <Badge bg="dark" className="p-3"> 
            <h2 className="fw-bold">{orderdetails?.order?.shippingRoute}</h2>
          </Badge>
        </Row>
             
        <Row className="mb-3">
          <Col>PO /Job Name:</Col>
          <Col className="fw-bold">{orderdetails?.order?.poName}</Col>
        </Row>
            
        <hr />
            
        <Row className="mb-5">
          <Col>Date</Col>
          <Col className="fw-bold">{new Date(
                      orderdetails?.order?.createdAt
                    ).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })} </Col>
        </Row>
            
        <Row className="container justify-content-center">
          <Button 
            onClick={handlePrint}
            variant="primary"
            type='submit'
            className="printer-btn shadow col-6" >
                Print
          </Button>
        </Row> 
      </div>
  );
};


