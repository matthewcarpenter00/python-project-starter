import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        
        <Col className="text-center">
        <img src="https://static1.squarespace.com/static/5feb8101b5b33b527b373ebc/t/624deb72c3b55f64018575de/1649273714852/stdpsolution+icon-05.png" 
          width="80"
          height="80"
           ></img>
        </Col>
      
      </Row>

      <Row className="justify-content-md-center">
        <Col md="4" >
              <Form onSubmit={onLogin} className="rounded p-4">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <Form.Group className="mb-3" controlID="formEmail">
          <Form.Label >
            Email:
          </Form.Label>
          <Form.Control  
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlID="formPassword">
          <Form.Label >
            Password: 
          </Form.Label >
          <Form.Control  
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </Form.Group>
          <NavLink to="/profile/user/">
            <Button variant="dark" type='submit' >
              login
            </Button>
          </NavLink>
      </Form>
      </Col>
    </Row>

    </Container>
  );
};

export default LoginForm;
