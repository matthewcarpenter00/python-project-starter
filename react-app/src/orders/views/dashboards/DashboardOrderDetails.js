import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router";
import emailjs from "@emailjs/browser";

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // trying to format date
  // let createdAt = let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(createAt);

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
                  <Button
                    onClick={() => {
                      history.push(`/productionlabel`);
                    }}
                    variant='dark'
                    className='mb-3'
                  >
                    print production label
                  </Button>
                </Col>
                <Col md='auto'>
                  <Button
                    onClick={() => {
                      history.push(`/productlabel`);
                    }}
                    variant='dark'
                    className='mb-3'
                  >
                    print product label
                  </Button>
                </Col>
                <Col md='auto'>
                  <Button inactive variant='secondary' className='mb-3'>
                    generate invoice
                  </Button>
                </Col>
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
                    value={orderdetails?.customer.company}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formOrderDate'>
                  <Form.Label>Date Placed</Form.Label>
                  <Form.Control type='text' value={orderdetails?.createdAt} />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formJobName'>
                  <Form.Label>PO/Job Name</Form.Label>
                  <Form.Control type='text' value={orderdetails?.poName} />
                </Form.Group>

                <Form.Group as={Col} controlId='formRoute'>
                  <Form.Label>Route</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.shippingRoute}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formStatus'>
                  <Form.Label>Status</Form.Label>
                  <Form.Control type='text' value={orderdetails?.orderStatus} />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.customer.tierLevel}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Invoice #</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.invoiceNumber}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formTotalAmount'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type='text' value={orderdetails?.totalAmount} />
                </Form.Group>
              </Row>
              <Row>
                <Table striped bordered hover responsive='lg' className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Tier</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Qty</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>A</td>
                      <td>Vinyl Deco Stairnose</td>
                      <td>14</td>
                      <td>$168</td>
                      <td>corner edge</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>2</td>
                      <td>A</td>
                      <td>White Riser</td>
                      <td>12</td>
                      <td>$108</td>
                      <td>none</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>3</td>
                      <td>A</td>
                      <td>T-moulding</td>
                      <td>1</td>
                      <td>$14</td>
                      <td>2 inches wide</td>
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
