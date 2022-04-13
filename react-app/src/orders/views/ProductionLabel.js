import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export const ProductionLabel = () => {


  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <Form  className="col-6 rounded p-4 p-sm-3" closeButton>
        <h1>Production Label</h1>
            <Row className="mb-3">
              <Col>Order ID</Col>
              <Col>001</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Customer</Col>
              <Col>JDA Flooring</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Product 1</Col>
              <Col>Vinyl Stairnose Deco</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Quantity</Col>
              <Col>14</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Route</Col>
              <Col>South</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Date</Col>
              <Col>04/01/22</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Notes</Col>
              <Col>2 inch thick</Col>
            </Row>
           
              <Row className="m-5">
               
              <Button 
                onClick={()=>{window.print()}}
              variant="dark" type='submit' >
                print
              </Button>
           
              </Row>
           
      </Form>
    </div>
  );
};


