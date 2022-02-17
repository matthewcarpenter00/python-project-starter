import React from "react";
import { useHistory } from "react-router-dom";
import "../order-styles.css";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

import { Product } from "../components/Product";

const arrayProduct = [
  {
    src: "https://via.placeholder.com/50",
    alt: "",
    title: "vinyl",
    description: "stari-noses",
  },
  {
    src: "https://via.placeholder.com/50",
    alt: "",
    title: "engineered wood",
    description: "stari-noses",
  },
  {
    src: "https://via.placeholder.com/50",
    alt: "",
    title: "mouldings",
    description: "",
  },
  {
    src: "https://via.placeholder.com/50",
    alt: "",
    title: "whiteriser",
    description: "",
  },
];

export const SelectProduct = () => {
  const history = useHistory();

  return (
    <Container fluid>
      <Row>
        <Col />
        <Col xs={6}>
          <Card className='mb-3'>
            <Card.Header className='bg-secondary'>Select a Product</Card.Header>
            <Row xs={2}>
              {arrayProduct.map((product) => (
                <Product key={product.title} {...product} />
              ))}
            </Row>
          </Card>
        </Col>
        <Col />
      </Row>
      <Row className='mb-4'>
        <Col>
          <Button
            onClick={() => history.push("new-order")}
            variant='secondary'
            className='float-end'
          >
            Back to start
          </Button>
        </Col>
        <Col xs={6} />
        <Col />
      </Row>
    </Container>
  );
};
