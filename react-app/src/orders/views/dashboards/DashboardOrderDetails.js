import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";

// redux and custom hook imports
import { useSelector } from "react-redux";
import Select from "react-select";
import { orderStatusOptions, staffOptions } from "../common";

import Alert from "react-bootstrap/Alert";
import { NewProductFormModal } from "../../components/NewProductFormModal";

export const DashboardOrderDetails = () => {
  const history = useHistory();
  const username = useSelector((state) => state.session.user.username);
  let { id: orderId } = useParams();

  // Current Order
  // const { orderdetails, setOrderDetails } = useFetchOrder({ orderId });
  const [orderdetails, setOrderDetails] = useState("");
  const [orderStatus, setOrderStatus] = useState([]);

  const [staff, setStaff] = useState("");

  // Invoice
  const [createdInvoice, setCreatedInvoice] = useState(null);

  // Error Message
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    active: false,
    flag: "danger",
  });

  // edit order products
  const [showModal, setShowModal] = useState(false);

  // const dummyInvoice = {
  //   Line: [
  //     {
  //       DetailType: "SalesItemLineDetail",
  //       Amount: 200.0,
  //       SalesItemLineDetail: {
  //         ItemRef: {
  //           name: "Services",
  //           value: "1",
  //         },
  //       },
  //     },
  //   ],
  //   CustomerRef: {
  //     value: "1",
  //   },
  // };

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
              label:
                staffOptions[orderdetails?.order?.staffId - 1]?.label || "N/A",
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
  }, [orderId]);

  const editOrder = async (orderPayload) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) await history.push(`/profile/user/`);
    } catch (err) {
      console.log("Order could not be deleted");
    }
  };

  // Send Email
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

  const sendAnInvoice = (email, invoiceId) => {
    fetch("/api/auth/send-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        invoiceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const createInvoice = ({ order, products }) => {
    const lineItems = products.map((product, index) => {
      return {
        Amount: product.price * order.orderItems[index].quantity,
        DetailType: "SalesItemLineDetail",
        SalesItemLineDetail: {
          Qty: order.orderItems[index].quantity,
          UnitPrice: product.price,
          ItemRef: {
            value: product.quickbooksId,
            name: product.name,
          },
        },
      };
    });
    const payload = {
      Line: lineItems,
    //   CustomField: [
    //     { 
    //       StringValue: order.id
    //   }, {
    //       StringValue: order.poName
    //   }, {
    //       StringValue: order.shippingRoute
    //   }
    // ],
      CustomerRef: {
        value: order.customer.quickbooksId,
      },
    };
    fetch("/api/auth/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.Invoice)
          setErrorMessage({
            message: "Invoice could not be created",
            active: true,
          });
        editOrder({
          invoiceNumber: parseInt(data.Invoice.DocNumber),
        });
        sendAnInvoice(order.customer.email, data.Invoice.Id);
        setErrorMessage({
          message: "Invoice created and sent to customer",
          active: true,
          flag: "success",
        });
      })
      .catch((error) => console.log(error));
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
                    {/* <Col md='auto'>
                      <Button
                        onClick={sendEmail}
                        variant='success'
                        className='mb-3'
                      >
                        Send Order Ready Email
                      </Button>
                    </Col> */}
                    <Col md='auto'>
                      <Button
                        onClick={() => createInvoice(orderdetails)}
                        variant='success'
                        className='mb-3'
                      >
                        generate invoice
                      </Button>
                    </Col>
                    <Col md='auto'>
                      <Button
                        // onClick={() => printInvoice(orderdetails)}
                        variant='secondary'
                        className='mb-3'
                      >
                        print invoice
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Container>

            {/* Dashboard content */}
            {errorMessage.active && (
              <Alert variant={errorMessage.flag}>{errorMessage.message}</Alert>
            )}
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
                    value={new Date(
                      orderdetails?.order?.createdAt
                    ).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(orderdetails?.order?.id)}
                  >
                    Delete Order
                  </Button>
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
                  >
                    Update Order
                  </Button>
                </Col>
                <Col>
                  <Button variant='warning' onClick={() => setShowModal(true)}>
                    Add products
                  </Button>
                </Col>
              </Row>
            </Form>
            <NewProductFormModal
              showModal={showModal}
              setShowModal={showModal}
              onHide={() => setShowModal(false)}
              orderDetails={orderdetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};
