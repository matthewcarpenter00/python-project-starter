import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import axios from "axios";
import { customerSelectOptions } from "../../../adapters/customerAdapter";
import { productSelectOptions } from "../../../adapters/productAdapter";

export const DashboardNewOrder = () => {
  const params = useParams();
  // const { store, actions } = useContext(Context);
  let { id } = useParams();

  // const formatter = new Intl.NumberFormat("en-US", {
  // 	style: "currency",
  // 	currency: "USD",
  // 	minimumFractionDigits: 0
  // });

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);
  useEffect(() => {
    getProducts();
  }, []);
  const getCustomers = () => {
    axios(`${process.env.REACT_APP_API_URL}/customers`).then((res) => {
      console.log(res.data);
      const customerOptions = customerSelectOptions(res.data);
      console.log("customer options", customerOptions);
      setCustomers(customerOptions);
    });
  };
  const getProducts = () => {
    axios(`${process.env.REACT_APP_API_URL}/products`).then((res) => {
      console.log(res.data);
      const productOptions = productSelectOptions(res.data);
      console.log("customer options", productOptions);
      setProducts(productOptions);
    });
  };

  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* Dashboard title area */}
            <Container>
              <Row>
                <h2>New Order</h2>
              </Row>
            </Container>

            {/* Dashboard content */}
            <Form className='h-100 p-5 border rounded-3'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formOrderID'>
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control plaintext readOnly defaultValue='023' />
                </Form.Group>

                <Form.Group as={Col} controlId='formCustomer'>
                  <Form.Label>Customer</Form.Label>
                  <Select
                    defaultValue={customer}
                    onChange={setCustomer}
                    options={customers}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formOrderDate'>
                  <Form.Label>Date Placed</Form.Label>
                  <Form.Control type='date' placeholder='' />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formJobName'>
                  <Form.Label>PO/Job Name</Form.Label>
                  <Form.Control type='text' placeholder='PO/Job Name' />
                </Form.Group>

                <Form.Group as={Col} controlId='formRoute'>
                  <Form.Label>Route</Form.Label>
                  <Form.Select aria-label='SelectRoute'>
                    <option>Select</option>
                    <option value='1'>North</option>
                    <option value='2'>South</option>
                    <option value='3'>Orlando</option>
                    <option value='3'>Pick Up</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId='formStatus'>
                  <Form.Label>Status</Form.Label>
                  <Form.Select aria-label='SelectRoute'>
                    <option>Select</option>
                    <option value='1'>In Production</option>
                    <option value='2'>Ready</option>
                    <option value='3'>Completed</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Tier Level</Form.Label>
                  <Form.Select aria-label='SelectRoute'>
                    <option>Select</option>
                    <option value='1'>A</option>
                    <option value='2'>B</option>
                    <option value='3'>C</option>
                    <option value='1'>D</option>
                    <option value='2'>E</option>
                    <option value='3'>F</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId='formTierLevel'>
                  <Form.Label>Invoice #</Form.Label>
                  <Form.Control type='text' placeholder='0001' />
                </Form.Group>

                <Form.Group as={Col} controlId='formCustomer'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type='currency' placeholder='$400' />
                </Form.Group>
              </Row>
              <Row>
                <Table striped bordered hover responsive='lg' className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Qty</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <Select
                          defaultValue={product}
                          onChange={setProduct}
                          options={products}
                        />
                      </td>
                      <td>
                        <Form.Control type='text' placeholder='qty' />
                      </td>
                      <td>
                        <Form.Control type='text' placeholder='$0' />
                      </td>
                      <td>
                        <Form.Control type='text' placeholder='Notes' />
                      </td>
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
                    Save Order
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
