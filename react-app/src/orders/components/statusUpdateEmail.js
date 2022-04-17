import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Button, Container, Form, Row } from "react-bootstrap";

export const StatusUpdateEmail = () => {
  

  const sendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      customer: 'Matthew@firstlight.media',
  };

    emailjs.send('service_g2ht3pj', 'order-in-production', templateParams, 'kBf3wIb1lGnimy156')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Container>
      
        <Form onSubmit={sendEmail}>
        
          <label>Update Customer</label>
      
          
          <input type="submit" value="Send Email" />
        </Form>
     
        <Button 
          onClick={sendEmail}
          >
            Email Customer Status Update
          </Button>
      
    </Container>

   
  );
};