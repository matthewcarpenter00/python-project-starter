import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router";
import emailjs from "@emailjs/browser";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import { productSelectOptions } from "../../../adapters/productAdapter";

// redux and custom hook imports
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "../../../store/orders";
import { createOrderDto } from "../../../adapters/orderAdapter";
import Select from "react-select";
import { orderStatusOptions, staffOptions } from "../common";

export const DashboardOrderDetails = ({ user, userID }) => {
  const username = useSelector((state) => state.session.user.username);

  const params = useParams();
  const history = useHistory();
  let { id: orderId } = useParams();

  // order status
  // hooks and redux
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [orderdetails, setOrderDetails] = useState("");
  const [orderStatus, setOrderStatus] = useState([]);

  // staff
  const [staff, setStaff] = useState("");

  const statusSelect = () => {
    if (orderdetails) {
      return (
        <Form.Group as={Col} controlId='formStatus'>
          <Form.Label>Status</Form.Label>
          <Select
            defaultValue={{
              value: orderdetails?.order?.orderStatus,
              label: orderdetails?.order?.orderStatus,
            }}
            onChange={setOrderStatus}
            options={orderStatusOptions}
          />
        </Form.Group>
      );
    } else return null;
  };
  const staffSelect = () => {
    if (orderdetails) {
      return (
        <Form.Group as={Col} controlId='formStaff'>
          <Form.Label>Staff</Form.Label>
          <Select
            defaultValue={{
              value: orderdetails?.order?.staffId,
              label: staffOptions[orderdetails?.order?.staffId - 1].label,
            }}
            onChange={setStaff}
            options={staffOptions}
          />
        </Form.Group>
      );
    } else return null;
  };

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

  const editOrder = async (newOrderStatus) => {
    // const dto = createOrderDto(newOrderStatus);
    console.log(newOrderStatus);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderStatus),
      }
    );

    if (response.ok) {
      const data = await response.json();
      // call redux dispatch, it set customer also in store
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

  // email functionality
  const sendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      customer: orderdetails?.order?.customer.email,
    };

    emailjs
      .send(
        "service_g2ht3pj",
        "order-ready",
        templateParams,
        "kBf3wIb1lGnimy156"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    // alert ("Your Email has been sent!")
  };

  const createInvoice = () => {
    fetch("/api/auth/create-invoice")
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                    Order #<strong> {orderdetails?.order?.id}</strong>
                  </h2>
                </Col>
                <Col md='auto'>
                  <Link
                    to={{
                      pathname: `/profile/user/${orderdetails?.order?.id}/orderdetails/productionlabel`,
                      state: orderdetails,
                    }}
                    target='_blank'
                  >
                    <Button variant='dark' className='mb-3'>
                      Print Production Label
                    </Button>
                  </Link>
                </Col>

                <Col md='auto'>
                  <Link
                    to={{
                      pathname: `/profile/user/${orderdetails?.order?.id}/orderdetails/productlabel`,
                      state: orderdetails,
                    }}
                    target='_blank'
                  >
                    <Button variant='dark' className='mb-3'>
                      Print Product Label
                    </Button>
                  </Link>
                </Col>
                {!(username === "staff") && (
                  <>
                    <Col md='auto'>
                      <Button
                        onClick={sendEmail}
                        variant='success'
                        className='mb-3'
                      >
                        Send Order Ready Email
                      </Button>
                    </Col>
                    <Col md='auto'>
                      <Button
                        onClick={() => createInvoice()}
                        // disabled
                        variant='secondary'
                        className='mb-3'
                      >
                        generate invoice
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Container>

            {/* Dashboard content */}
            <Form className='h-100 p-5 border rounded-3'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formOrderID'>
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control type='text' value={orderdetails?.order?.id} />
                </Form.Group>

                <Form.Group as={Col} controlId='formCustomer'>
                  <Form.Label>Customer</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.order?.customer?.company}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formOrderDate'>
                  <Form.Label>Date Placed</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.order?.createdAt}
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formJobName'>
                  <Form.Label>PO/Job Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.order?.poName}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderdetails,
                        poName: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formRoute'>
                  <Form.Label>Route</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.order?.shippingRoute}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderdetails,
                        shippingRoute: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                {/* <Form.Group as={Col} controlId='formStatus'>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type='text'
                    value={orderdetails?.order?.orderStatus}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderdetails,
                        order: {
                          ...orderdetails.order,
                          orderStatus: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Group> */}
                {statusSelect()}
                {staffSelect()}
              </Row>
              {!(username === "staff") && (
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formTierLevel'>
                    <Form.Label>Tier Level</Form.Label>
                    <Form.Control
                      type='text'
                      value={orderdetails?.order?.customer.tierLevel}
                      onChange={(e) =>
                        setOrderDetails({
                          ...orderdetails,
                          tierLevel: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formTierLevel'>
                    <Form.Label>Invoice #</Form.Label>
                    <Form.Control
                      type='text'
                      value={orderdetails?.order?.invoiceNumber}
                      onChange={(e) =>
                        setOrderDetails({
                          ...orderdetails,
                          invoiceNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formTotalAmount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type='text'
                      value={orderdetails?.order?.totalAmount}
                    />
                  </Form.Group>
                </Row>
              )}
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
                    {orderdetails?.products?.map((orderItem, index) => (
                      <tr key={orderItem.id}>
                        <td>{index + 1}</td>
                        <td>{orderItem?.name}</td>
                        <td>
                          {orderdetails.order.orderItems[index]?.quantity}
                        </td>
                        <td>${orderItem?.price}</td>
                        <td>{orderdetails.order.orderItems[index]?.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col md='auto'>
                  <Button variant='danger'>Delete Order</Button>
                </Col>
                <Col>
                  <Button
                    onClick={() =>
                      editOrder({
                        orderStatus: orderStatus.value,
                        staffId: staff.value,
                      })
                    }
                    variant='success'
                    // onClick={editOrder({orderStatus: orderdetails?.orderStatus})}
                  >
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
