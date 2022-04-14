import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap"


export const ProductionLabel = () => {


  return (
    
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <div  className="col-6 rounded  p-sm-3" closeButton>
        <h1 className="mb-3 text-center">Production Label</h1>
            <Row className="mb-3">
              <Col>Order ID</Col>
              <Col className="fw-bold">001</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Customer</Col>
              <Col className="fw-bold">JDA Flooring</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Product 1</Col>
              <Col className="fw-bold">Vinyl Stairnose Deco</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Quantity</Col>
              <Col className="fw-bold">14</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Route</Col>
              <Col className="fw-bold">South</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Date</Col>
              <Col className="fw-bold">04/01/22</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Notes</Col>
              <Col className="fw-bold">2 inch thick</Col>
            </Row>
           
              <Row className="m-5">
               
              <Button 
                onClick={()=>{window.print()}}
              variant="dark" type='submit' className="printer-btn" >
                print
              </Button>
           
              </Row>
           
      </div>
    </div>
  );
};


