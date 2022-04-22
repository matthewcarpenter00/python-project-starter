import emailjs from "@emailjs/browser";

export const sendEmail = (customer, subject) => {
  var templateParams = {
    customer,
  };

  emailjs
    .send("service_g2ht3pj", subject, templateParams, "kBf3wIb1lGnimy156")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};
