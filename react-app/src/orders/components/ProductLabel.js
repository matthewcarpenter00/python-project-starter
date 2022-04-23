import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productSelectOptions } from "../../adapters/productAdapter";

export const ProductLabel = () => {

  let {id: orderId} = useParams();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([
    {
      id: 1,
      createdAt: "2022-04-16T18:36:20.778Z",
      updatedAt: "2022-04-16T18:36:20.778Z",
      sku: "dfvdfb",
      name: "Product 1",
      price: 10,
      imageUrl: "http://yahoo.com",
      description: "this is a description",
      tierLevel: "2",
      type: "SERVICE",
      quantity: 2,
      notes: "note",
    },
    {
      id: 2,
      createdAt: "2022-04-16T20:20:27.988Z",
      updatedAt: "2022-04-16T20:20:27.989Z",
      sku: "dfvdfb",
      name: "Product 2",
      price: 10,
      imageUrl: "http://yahoo.com",
      description: "this is a description",
      tierLevel: "2",
      type: "SERVICE",
      quantity: 2,
      notes: "note",
    },
  ]);

  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = () => {
    axios(`${process.env.REACT_APP_API_URL}/products`).then((res) => {
      const productOptions = productSelectOptions(res.data);
      setProducts(productOptions);
    });
  };

    // hooks and redux
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [orderdetails, setOrderDetails] = useState(null);
  
  
    const fetchOrder = async (orderId) => {
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/orders/${orderId}`
        `https://stepsolutionapi.herokuapp.com/orders/${orderId}`
    
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
              <Col className="fw-bold">{orderdetails?.id}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Date</Col>
              <Col className="fw-bold">{orderdetails?.createdAt}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Customer</Col>
              <Col className="fw-bold">{orderdetails?.customer.company}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>PO/Job Name</Col>
              <Col className="fw-bold">{orderdetails?.poName}</Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col>Route</Col>
              <Col className="fw-bold">{orderdetails?.shippingRoute}</Col>
            </Row>
            <hr />
    
            <Table bordered responsive='md' className='table'>
              <thead>
                <tr>  
                  <th scope='col'>#</th>
                  <th scope='col'>Product</th>
                  <th scope='col'>Qty</th>
                  <th scope='col'>Notes</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.notes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>    
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


