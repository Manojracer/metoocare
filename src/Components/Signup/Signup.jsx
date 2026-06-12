import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../Utils/Validation";
import { resendOTP, verifySignupOTP } from "../../Api/login";
import { signup } from "../../Api/user";
import { toast } from "react-toastify";
import { saveToken } from "../../Utils/Storage";
import { isAuthenticated } from "../../Utils/Auth";
import leftImage from "../../Assests/images/Figma.png";

const Signup = () => {
  const navigate = useNavigate();

  const initialStateInputs = {
    name: "",
    email: "",
    otp: "",
  };

  const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    otp: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [step, setStep] = useState("email");
  const [submitted, setSubmitted] = useState(false);

  const handleContinue = () => {
    if (isValidEmail(inputs.email)) {
      setStep("otp");
    } else {
      setStep("email");
    }
  };

  const handleValidation = (data) => {
    const error = { ...initialStateErrors };
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.otp === "") {
      error.otp.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });

    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (!newError.email.required && !newError.email.valid) {
      const data = { name: inputs.name, email: inputs.email };
      signup(data)
        .then((res) => {
          const _id = res?.data?.result?._id;
          setInputs({ ...inputs, _id });

          if (res?.data?.result?.sendOTP) {
            setStep("otp");
          } else {
          }
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (!newError.otp.required) {
      const data = { name: inputs.name, email: inputs.email, otp: inputs.otp };
      verifySignupOTP(data)
        .then((res) => {
          if (res?.data?.success) {
            const token = res?.data?.result?.token;
            const userId = res?.data?.result?.userDetails?._id;

            const userData = {
              token: token,
              logId: userId,
            };

            saveToken(userData);
            if (isAuthenticated()) {
              navigate("/login");
            }
            toast.success(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const resendOtp = () => {
    const data = { email: inputs?.email };
    resendOTP(data)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="signup_whole_body">
      <div className="container ">
        <div className="row  justify-content-center align-items-center signup-container-position">
          <div className="AppForms shadow-lg">
            <div className="row">
              <div className="col-md-6 align-items-center custom_login_bd_colorr">
                <div>
                  <form onSubmit={handleLogin}>
                    <div className="AppFormLeft">
                      <h1>Sign up</h1>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="text"
                          name="name"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          id="username"
                          placeholder="Name"
                          onChange={handleInputs}
                        />
                        {errors.name.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="form-group position-relative mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          id="password"
                          placeholder="Email"
                          onChange={handleInputs}
                        />
                        {errors.email.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : errors.email.valid ? (
                          <span className="text-danger form-text">
                            Enter a valid email address
                          </span>
                        ) : null}
                      </div>
                      <button
                        className="btn btn-success btn-block shadow border-0 py-2 text-uppercase mx-5"
                        onClick={handleContinue}
                      >
                        Continue
                      </button>
                      <br />
                      <br />
                    </div>
                  </form>
                  <form onSubmit={handleSubmit}>
                    {step === "otp" ? (
                      <div className="signup_otp">
                        <div className="form-group position-relative mb-4 mx-5">
                          <p className="">ENTER A OTP</p>
                          <input
                            type="text"
                            name="otp"
                            className="form-control border-top-15 border-right-25 border-left-20 rounded-0 shadow-none"
                            id="password"
                            placeholder="Enter OTP"
                            onChange={handleInputs}
                          />
                        </div>

                        <div className="btn">
                          <button className="btn btn-success" type="submit">
                            Verify OTP
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-success"
                            onClick={resendOtp}
                          >
                            Resend OTP
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </form>
                  <p className="text-center mt-5">
                    Back to -&gt;
                    <a href="/login">Login</a>
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="AppFormRight1  ">
                  <img src={leftImage}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
