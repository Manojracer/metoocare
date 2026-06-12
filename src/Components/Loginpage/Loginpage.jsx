import React, { useState } from "react";
import "./Login.css";
import { isValidEmail } from "../../Utils/Validation";
import { useNavigate } from "react-router-dom";
import { Loginpanel, resendOTP, verifyOTP } from "../../Api/login";
import { toast } from "react-toastify";
import { saveToken } from "../../Utils/Storage";
import { isAuthenticated } from "../../Utils/Auth";
import leftImage from "../../Assests/images/Figma.png";
import { useDispatch } from "react-redux";
import { fetchCartDataAsync } from "../../State Mangement/action";
const Loginpage = () => {
  const navigate = useNavigate();

  let initialStateInputs = {
    email: "",
    otp: "",
  };

  let initialStateErrors = {
    email: { required: false, valid: false },
    otp: { required: false, valid: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [step, setStep] = useState("email");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (isValidEmail(inputs.email)) {
      setStep("otp"); 
    } else {
      setStep("email");
    }
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
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
    const { name } = event.target;
    setInputs({ ...inputs, [event.target.name]: event.target.value });

    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid =
      !newError?.email?.required && !newError?.email?.valid;

    if (allInputsValid) {
      const data = { email: inputs?.email };
      Loginpanel(data)
        .then((res) => {
          const _id = res?.data?.result?._id;
          setInputs({ ...inputs, _id });
          toast.success(res?.data?.message);
          if (res?.data?.result?.sendOTP) {
            setStep("otp");
          } else {
          }
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
      const data = { email: inputs.email, otp: inputs.otp };
      verifyOTP(data)
        .then((res) => {
          if (res?.data?.success) {
            let token = res?.data?.result?.token;
            let userId = res?.data?.result?.userDetails?._id;

            let userData = {
              token: token,
              userId: userId,
            };
            saveToken(userData);
            if (isAuthenticated()) {
              dispatch(fetchCartDataAsync());
              navigate("/");
            }
            toast.success(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
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
    <div className="login-wholebody">
      <div className="container h-100  ">
        <div className="row h-100 justify-content-center align-items-center login-container-position ">
          <div className="col-md-9">
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6">
                  <div className="AppFormRightLogin position-relative">
                    <img src={leftImage}></img>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center align-items-center custom_login_bd_color">
                  <div className="AppFormLeftLogin">
                    <form onSubmit={handleLogin}>
                      <h1 className="font_colr">LOGIN</h1>
                      <div className="form-group position-relative w-100 mx-5 mb-4 emai">
                        <input
                          type="email"
                          className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          id="password"
                          name="email"
                          onChange={handleInputs}
                          placeholder="Email"
                        />
                        {errors.email.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : errors.email.valid ? (
                          <span className="text-danger form-text">
                            Enter a valid mail id
                          </span>
                        ) : null}
                      </div>
                      <button
                        className="btn btn-success btn-block shadow border-0  py-2 text-uppercase mx-5"
                        onClick={handleContinue}
                      >
                        Continue
                      </button>
                      <br />
                      <br />
                    </form>
                    <form onSubmit={handleSubmit}>
                      {step === "otp" ? (
                        <div>
                          <div className="form-group position-relative mb-4 mx-5">
                            <p className="">ENTER A OTP</p>
                            
                            <input
                              type="text"
                              name="otp"
                              placeholder=" Enter OTP"
                              onChange={handleInputs}
                              className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                            />
                          </div>

                          <div className="mx-5">
                            <button className="btn btn-success" type="submit">
                              Verify OTP{" "}
                            </button>
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
                    <p className="text-center text-dark mt-5">
                      <a href="/signup">Signup</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
