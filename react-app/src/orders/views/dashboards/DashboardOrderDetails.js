import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useHistory } from "react-router";
import emailjs from "@emailjs/browser";
import Toast from 'react-bootstrap/Toast';


// redux and custom hook imports
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "../../../store/orders";
import { createOrderDto } from "../../../adapters/orderAdapter";

export const DashboardOrderDetails = ({ user, userID }) => {
  const params = useParams();
  const history = useHistory();
  let { id: orderId } = useParams();

  const [show, setShow] = useState(false);


  // hooks and redux
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
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


  // email functionality
  const sendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      customer: orderdetails?.customer.email, 
  };

    emailjs.send('service_g2ht3pj', 'order-ready', templateParams, 'kBf3wIb1lGnimy156')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* Dashboard title area */}
            <Container>
              <Row className='mb-3'>
                <Col>
                  <h2>
                    Order #<strong> {orderdetails?.id}</strong>
                  </h2>
                </Col>
                <Col md='auto'>
                  <Link 
                    to = {{pathname: `/profile/user/${orderdetails?.id}/orderdetails/productionlabel`, state: orderdetails }}
                    target="_blank">
                    <Button
                        variant='dark'
                        className='mb-3'
                    >
                      Print Production Label
                    </Button>
                  </Link>
                </Col>

                <Col md='auto'>
                  <Link 
                     to = {{pathname: `/profile/user/${orderdetails?.id}/orderdetails/productlabel`, state: orderdetails }}
                    target="_blank">
                    <Button
                        variant='dark'
                        className='mb-3'
                    >
                      Print Product Label
                    </Button>
                  </Link>
                </Col>

                <Col md='auto'>
                  <Button
                  onClick={sendEmail}
                  variant='success'
                  className='mb-3'>
                    Send Order Ready Email
                    </Button>
                </Col>
                {/* <Col md='auto'>
                  <Button disabled variant='secondary' className='mb-3'>
                    generate invoice
                  </Button>
                </Col> */}
              </Row>
            </Container>

            {/* Dashboard content */}
            <Form className='h-100 p-5 border rounded-3'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formOrderID'>
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control type='text' value={orderdetails?.id} />
                </Form.Group>

                <Form.Group as={Col} controlId='formCustomer'>
                  <Form.Label>Customer</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.customer?.company}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formOrderDate'>
                  <Form.Label>Date Placed</Form.Label>
                  <Form.Control type='text' value={Date.parse(orderdetails?.createdAt)} />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formJobName'>
                  <Form.Label>PO/Job Name</Form.Label>
                  <Form.Control type='text' value={orderdetails?.poName} onChange={(e)=>setOrderDetails({... orderdetails, poName:e.target.value})} />
                </Form.Group>

                <Form.Group as={Col} controlId='formRoute'>
                  <Form.Label>Route</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.shippingRoute}
                    onChange={(e)=>setOrderDetails({... orderdetails, shippingRoute:e.target.value})}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formStatus'>
                  <Form.Label>Status</Form.Label>
                  <Form.Control type='text' value={orderdetails?.orderStatus} onChange={(e)=>setOrderDetails({... orderdetails, orderStatus:e.target.value})} />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.customer.tierLevel}
                    onChange={(e)=>setOrderDetails({... orderdetails, tierLevel:e.target.value})}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Invoice #</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.invoiceNumber}
                    onChange={(e)=>setOrderDetails({... orderdetails, invoiceNumber:e.target.value})}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formTotalAmount'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type='text' value={orderdetails?.totalAmount}  />
                </Form.Group>
              </Row>
              <Row>
                <Table striped bordered hover responsive='lg' className='table'>
                  <thead className='thead-dark'>
                    <tr>
                    <th scope='col'>#</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Qty</th>
                      <th scope='col'>Rate</th>
                      <th scope='col'>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* show order items */}
                    <tr>
                      <td>1</td>
                      <td>Vinyl Deco Stairnose</td>
                      <td>14</td>
                      <td>$168</td>
                      <td>corner edge</td>
                    </tr>
                  </tbody>
              
                </Table>
              </Row>
              <Row>
                <Col md='auto'>
                  <Button variant='danger' type='submit'>
                    Delete Order
                  </Button>
                </Col>
                <Col>
                  <Button variant='success' type='submit'>
                    Update Order
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
