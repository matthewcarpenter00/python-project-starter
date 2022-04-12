import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../order-styles.css";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import { arrayProduct } from "../products";

import { Product } from "../components/Product";
import { FormTitleCard } from "../components/FormTitleCard";
import { FormInputCard } from "../components/FormInputCard";
import { useForm } from "../../hooks/useForm";

const initialForm = {
  specialSize: "",
  addOns: "",
  quantity: "",
  poJobName: "",
};

export const SelectProductDetails = () => {
  const history = useHistory();
  let { productId } = useParams();

  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { specialSize, addOns, quantity, poJobName } = formValues;

  const handleSubmit = (event) => {
    event.preventDefault();
    reset();
  };

  const [currentProduct, setCurrentProduct] = useState(null);
  useEffect(() => {
    const product = arrayProduct.find((product) => product.id === productId);
    setCurrentProduct(product);
  }, [productId]);

  if (!currentProduct) return "Loading";
  return (
    <Container fluid>
<<<<<<< HEAD
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='p-4'
      >
        <Row>
          <Col />
          <Col md={5}>
            <Card className='mb-3'>
              <Card.Header className='bg-secondary'>
                {currentProduct.title}
              </Card.Header>

              <Form.Label>PO#/ Job Name</Form.Label>
              <Form.Control
                required
                minLength='2'
=======
      <Row>
        <Col />
        <Col md={5}>
          <Card className='mb-3'>
            <Card.Header className='bg-secondary'>
              {currentProduct.title}
            </Card.Header>
            <Form onSubmit={handleSubmit} className='p-4'>
              <Form.Label>PO#/ Job Name</Form.Label>
              <Form.Control
>>>>>>> develop
                className='custom-input'
                type='text'
                placeholder='Your answer'
                value={poJobName}
                name='poJobName'
                onChange={handleInputChange}
              />
<<<<<<< HEAD
              <Form.Control.Feedback type='invalid'>
                Must be min Two Characters Long or more.
              </Form.Control.Feedback>

              <Row xs={2}>
                {arrayProduct.map((product) => (
                  <Product
                    key={product.title}
                    {...product}
                    styles={product.styles}
                    handleClick={() => {
                      setProductModel(product.title);
                      arrayProduct.map((_product) =>
                        _product.id === product.id
                          ? (_product.styles = "text-white bg-dark")
                          : (_product.styles = "")
                      );
                    }}
                  />
                ))}
              </Row>
            </Card>
          </Col>
          <Col md={6}>
            <FormTitleCard />

            <FormInputCard inputLabel='Quantity'>
              <Form.Control
                required
                className='custom-input'
                type='number'
                placeholder='Your quantity'
=======
            </Form>

            <Row xs={2}>
              {arrayProduct.map((product) => (
                <Product key={product.title} {...product} />
              ))}
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <FormTitleCard />
          <Form onSubmit={handleSubmit}>
            <FormInputCard inputLabel='Quantity'>
              <Form.Control
                className='custom-input'
                type='text'
                placeholder='Your answer'
>>>>>>> develop
                value={quantity}
                name='quantity'
                onChange={handleInputChange}
              />
            </FormInputCard>
<<<<<<< HEAD
            <FormInputCard inputLabel={currentProduct.notesLabel}>
              <Form.Control
                required
                as='textarea'
                rows={3}
                className='custom-input'
                placeholder='Your Answer'
                value={notes}
                name='notes'
=======
            <FormInputCard inputLabel='Special size / Notes'>
              <Form.Control
                className='custom-input'
                type='text'
                placeholder='Your Answer'
                value={specialSize}
                name='specialSize'
                onChange={handleInputChange}
              />
            </FormInputCard>
            <FormInputCard inputLabel='Add ons'>
              <Form.Control
                className='custom-input'
                type='text'
                placeholder='Your Answer'
                value={addOns}
                name='addOns'
>>>>>>> develop
                onChange={handleInputChange}
              />
            </FormInputCard>
            <FormInputCard inputLabel='Do you need to order anything else?'>
              <div className='d-flex d-flex justify-content-evenly'>
                <Button
                  type='submit'
                  variant='dark'
                  size='lg'
<<<<<<< HEAD
                  onClick={() => setNextAction("add_more_products")}
                >
                  Yes, add more products
                </Button>
                <Button type='submit' variant='dark' size='lg'>
=======
                  //   onClick={() => setClientType("new-client")}
                >
                  Yes, add more products
                </Button>
                <Button
                  //   onClick={() => setClientType("recurrent-client")}
                  type='submit'
                  variant='dark'
                  size='lg'
                >
>>>>>>> develop
                  No, i'm finished
                </Button>
              </div>
            </FormInputCard>
<<<<<<< HEAD
          </Col>
          <Col />
        </Row>
        <Row className='mb-4'>
          <Col>
            <Button
              onClick={() => history.push("/new-order")}
              variant='secondary'
              className='float-end'
            >
              Back to start
            </Button>
          </Col>
          <Col xs={6} />
          <Col />
        </Row>
      </Form>
=======
          </Form>
        </Col>
        <Col />
      </Row>
      <Row className='mb-4'>
        <Col>
          <Button
            onClick={() => history.push("/new-order")}
            variant='secondary'
            className='float-end'
          >
            Back to start
          </Button>
        </Col>
        <Col xs={6} />
        <Col />
      </Row>
>>>>>>> develop
    </Container>
  );
};
