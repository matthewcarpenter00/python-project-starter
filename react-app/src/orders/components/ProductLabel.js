import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";

export const ProductLabel = () => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (

    <div  className="mt-5 d-flex justify-content-center align-items-center">
      <div ref={componentRef} className="col-6 rounded  p-sm-3" closeButton>
        
         
          <img
              alt=""
              src="https://static1.squarespace.com/static/5feb8101b5b33b527b373ebc/t/624deb72c3b55f64018575de/1649273714852/stdpsolution+icon-05.png"
              width="100"
              height="100"
              className="mb-3 mx-auto d-block"
            />
         
        <h1 className="mb-3 text-center">Product Label</h1>
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
              <Col>PO/Job Name</Col>
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
           
              <Row className="m-5">
               
              <Button 
                onClick={handlePrint}
              variant="dark" type='submit' className="printer-btn" >
                print
              </Button>
           
              </Row>
           
      </div>
    </div>
  );
};


