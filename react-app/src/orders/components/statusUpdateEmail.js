import React from "react";
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
    const form = useRef();
  
    const sendInProductionEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('gmail', 'order-in-production', form.current, 'YOUR_PUBLIC_KEY')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
  };