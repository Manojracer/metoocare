import React from "react";
import "./Footer.css";
import metoo from "../../Assests/images/Image-vdfidi.jpeg";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div>
      <div>
        <footer className="pt-2">
          <div className="container ">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="single-box fon_weight_con">
                  <a href="/">
                    {" "}
                    <img className="w-75 change_clr_logo" src={metoo} alt />
                  </a>

                  <p>
                    Sign up to our newsletter and exclusive discounts and offers
                    !!
                  </p>
                  <h3>We Accept</h3>
                  <p className="socials icon_ii_clr">
                    <i className="change_hover_har">
                      <FaFacebook />
                    </i>
                    <i className="change_hover_har">
                      <AiOutlineTwitter />
                    </i>
                    <i className="change_hover_har">
                      <AiOutlineInstagram />
                    </i>
                    <i className="change_hover_har">
                      <AiFillYoutube />
                    </i>
                    <i className="change_hover_har">
                      <AiFillLinkedin />
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-box">
                  <h2 className="pt-2  change_clrrrrr_cem">Company</h2>
                  <ul>
                    <li>
                      <a href="#" className="fw-bold">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="fw-bold">
                        {" "}
                        Roadmap
                      </a>
                    </li>
                    <li>
                      <a href="Privacy" className="fw-bold">
                        {" "}
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="Faq" className="fw-bold">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="TermsConditions" className="fw-bold">
                        Terms & Condition
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-box ">
                  <h2 className="pt-2 ">Usefull Links</h2>
                  <ul>
                    <li>
                      <a href="#" className="fw-bold">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="fw-bold">
                        {" "}
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="fw-bold">
                        {" "}
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="fw-bold">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="fw-bold">
                        Help
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-box">
                  <h2 className="pt-2 ">Newsletter</h2>
                  <p className="fw-2 fw-bold">Write your email*</p>
                  <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                    <input
                      type="text"
                      className="form-control"
                      placeHolder="Email"
                      aria-label="Enter your Email ..."
                      aria-describedby="basic-addon2"
                    />
                    <a
                      className="TCbg text-decoration-none px-5 p-1 rounded text-white fw-bold "
                      href="/ContactUs"
                    >
                      ContactUs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
