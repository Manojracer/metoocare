import React, { useState } from "react";
import "./ContactUs.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { toast } from "react-toastify";
import { saveContact } from "../../Api/contactus";
import metoo from "../../Assests/images/Image-vdfidi.jpeg";
import logo from "../../Assests/images/pix logo.png";

const ContactUs = () => {
  const initialStateInputs = {
    name: "",
    email: "",
    mobileNumber: "",
    messages: "",
  };

  const initialStateErrors = {
    name: { required: false },
    email: { required: false },
    mobileNumber: { required: false },
    messages: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };

    if (data.name === "") {
      newErrors.name = true;
    }
    if (data.email === "") {
      newErrors.email = true;
    }
    if (data.mobileNumber === "") {
      newErrors.mobileNumber = true;
    }
    if (data.messages === "") {
      newErrors.messages = true;
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);
    if (!valid) {
      saveContact(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          event.target.reset();
          setInputs(initialStateInputs);
          setErrors(initialStateErrors);
          setSubmitted(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 p-5 gradient-custom1">
            <h2 className="mb-2 font-weight-bold">Contact Us</h2>
            <p className="text-light">
              We understand the importance of effective communication and
              support in achieving your business goals. Whether you have
              questions about our products, need assistance with
              troubleshooting, or require guidance on how to maximize the
              benefits of our services, our knowledgeable team is here to help.
              Our customer-centric approach means that we prioritize your needs
              and strive to provide prompt, reliable assistance every step of
              the way. From initial inquiries to ongoing support, we're
              dedicated to ensuring your experience with us is positive and
              productive. By choosing to work with us, you're not just getting a
              service provider; you're gaining a trusted partner committed to
              your success. We value your trust and confidence in us and are
              committed to delivering solutions that exceed your expectations.
              So, whether you prefer to connect with us via phone, email, or by
              filling out the form below, rest assured that your queries will be
              met with professionalism, expertise, and a genuine desire to help.
              Thank you for considering us as your business partner. We look
              forward to the opportunity to support you and your organization's
              growth journey.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-between gap-5 mb-3">
              <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
                <h4 className="mb-0">Mobile:</h4>
                <h5 className="text-white mb-0">+91 8778584566</h5>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
                <img
                  src={metoo}
                  alt="metoo Logo"
                  className="rounded-2"
                  height={50}
                  width={100}
                />
                <h4 className="text-white mb-0">metoo.care@pixalive.me</h4>
              </div>
            </div>
            <div className="text-center text-md-start">
              <div className="d-grid gap-2 align-items-center">
                <h4 className="mb-0">Address:</h4>
                <p className="text-white">
                  2nd Phase, Third Floor, 35/2,Hosur Rd,
                  <br />
                  Konappana Agrahara, Electronic City,
                  <br />
                  Bengaluru, Karnataka - 560100
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="d-flex flex-wrap p-3 gap-3">
                <button
                  type="button"
                  className="btn btn-outline rounded-pill text-white"
                  style={{ borderColor: "white" }}
                >
                  <img
                    src={logo}
                    alt="Pixalive Logo"
                    style={{
                      width: "12px",
                      height: "13px",
                      marginRight: "5px",
                    }}
                  />
                  Pixalive
                </button>
                <button
                  type="button"
                  className="btn btn-outline rounded-pill text-white"
                  style={{ borderColor: "white" }}
                >
                  <i className="bi bi-twitter"></i> Twitter
                </button>
                <button
                  type="button"
                  className="btn btn-outline rounded-pill text-white"
                  style={{ borderColor: "white" }}
                >
                  <i className="bi bi-linkedin"></i> Linkedin
                </button>
                <button
                  type="button"
                  className="btn btn-outline rounded-pill text-white"
                  style={{ borderColor: "white" }}
                >
                  <i className="bi bi-youtube"></i> Youtube
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 p-2 d-flex justify-content-center p-5">
            <form className="" onSubmit={handleSubmit}>
              <div
                className="card_collor text-center p-md-3 mx-md-5 shadow-lg mb-5 p-3 mb-5"
                style={{ maxWidth: "40rem" }}
              >
                <div className="card-body">
                  <h3 className="text-center mb-4">Get a free quote</h3>
                  <div className="mb-3">
                    <input
                      onChange={handleInputs}
                      type="name"
                      placeholder="Enter name"
                      className="form-control rounded-pill p-3"
                      name="name"
                    />
                    {errors.name?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={handleInputs}
                      type="email"
                      placeholder="Enter email"
                      className="form-control rounded-pill p-3"
                      name="email"
                      aria-describedby="emailHelp"
                    />
                    {errors.email?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={handleInputs}
                      type="text"
                      placeholder="Enter mobile number"
                      className="form-control rounded-pill p-3"
                      maxLength={10}
                      name="mobileNumber"
                    />
                    {errors.mobileNumber?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <textarea
                      onChange={handleInputs}
                      placeholder="Message goes here..."
                      type="text"
                      className="form-control rounded p-3"
                      rows="5"
                      name="messages"
                    ></textarea>
                    {errors.messages?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-save w-50 w-md-50 border"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
