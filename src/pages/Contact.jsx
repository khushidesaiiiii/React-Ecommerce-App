import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../UI/Button";

import contact1 from "../assets/images/contact/contact1.png";
import contact2 from "../assets/images/contact/contact2.png";
import contact3 from "../assets/images/contact/contact3.png";
import contact4 from "../assets/images/contact/contact4.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs;
    emailjs
      .sendForm(
        "service_ixkb58g",
        "template_hbag6dg",
        event.target,
        `-A-81u-zW_tekVmaN`
      )

      .then(() => {
        toast.success("Message sent successfully! ", {
          position: "top-right",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Something went wrong ", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Write your feedback or query here..."
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit"> Send </Button>
        </form>
        <div className="image-grid">
          <img src={contact1} alt="Conatct image" />
          <img src={contact2} alt="Conatct image" />
          <img src={contact3} alt="Conatct image" />
          <img src={contact4} alt="Conatct image" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
