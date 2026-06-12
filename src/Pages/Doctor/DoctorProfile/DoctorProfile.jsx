import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./DoctorProfile.css";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { getAllDoctor, getSingleDoctor } from "../../../Api/doctorprofile";
import { Link } from "react-router-dom";
import { getMonthYear } from "../../../Utils/DateFormat";
import Appointment from "./Appointment";
import { MdMarkEmailRead } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { allDoctorreviews, postDoctorreview } from "../../../Api/doctorreview";
import { getUserId } from "../../../Utils/Storage";
import { isAuthenticated } from "../../../Utils/Auth";
import { getallusers, getsingleuser } from "../../../Api/user";
import { localDate } from "../../../Utils/DateFormat";
import { toast } from "react-toastify";

function DoctorProfile() {
  const ratingdoc = 3;

  let [searchParams] = useSearchParams();
  const [DoctorDetails, setDoctorDetails] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTreatmentTitle] = useState("");
  const [user, setUser] = useState(null);
  const [rateuser, setRateUser] = useState(null);
  const userId = getUserId();
  const [count, setCount] = useState(0);
  const [userdetail, setUserDetail] = useState("");
  const [alluserdetails, setAlluserDetails] = useState([]);
  const [name, setName] = useState("");
  let productId = searchParams.get("productId");
  let DoctorId = searchParams.get("DoctorId");

  useEffect(() => {
    getSingleDoctor(DoctorId)
      .then((response) => {
        const doctorDetails = response.data.result;
        setDoctorDetails(doctorDetails);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [DoctorId]);

  //Bookappointment
  const [openAppointmentModal, setOpenAppointmentModal] = React.useState(false);

  const handleOpenAppointment = () => {
    setOpenAppointmentModal(true);
  };

  const handleCloseAppointment = () => {
    setOpenAppointmentModal(false);
  };

  //
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = () => {
    getAllDoctor()
      .then((res) => {
        const allDoctors = res?.data?.result;
        const filteredDoctors = selectedSpecialization
          ? allDoctors.filter(
              (doctor) => doctor.specialization === selectedSpecialization
            )
          : allDoctors;

        setSuggestedDoctors(filteredDoctors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //scroll

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleStarClick = (starIndex) => {
    const userRating = starIndex + 1;
    setRating(userRating);
    localStorage.setItem(`userRating_${productId}`, userRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlenameChange = (e) => {
    setName(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTreatmentTitle(e.target.value);
  };
  const setReviewVisibility = () => {
    setName("");
    setRating(0);
    setTreatmentTitle("");
    setComment("");
  };
  const saveProductData = async () => {
    try {
      const authenticated = await isAuthenticated();

      if (authenticated && (user || rating || comment || title !== undefined)) {
        const data = {
          doctorId: DoctorId,
          rating: rating,
          title: title,
          comment: comment,
          userId: userId,
        };
        await postDoctorreview(data);
        setReviewVisibility();
        getProducts();
        toast.success("Your comment has been successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    allDoctorreviews()
      .then((res) => {
        const productRatings = res?.data?.result || [];
        const userRatings = productRatings.filter(
          (rating) => rating.userId && rating.userId._id === userId
        );
        const productsWithDetails = userRatings.map((rating) => ({
          ...rating,
          productDetails:
            productRatings.find(
              (product) => product.productId === rating.productId
            ) || {},
        }));
        const sortedSingleDoctorRatings = productsWithDetails.sort((a, b) => {
          const dateA = new Date(a.modifiedOn);
          const dateB = new Date(b.modifiedOn);
          return dateB - dateA;
        });
        setUserDetail(sortedSingleDoctorRatings);
        const allproductRatings = res?.data?.result || [];
        const alluserRatings = allproductRatings.filter(
          (rating) => rating.userId && rating.userId._id !== userId
        );
        const allproductsWithDetails = alluserRatings.map((rating) => ({
          ...rating,
          productDetails:
            allproductRatings.find(
              (product) => product.productId === productId
            ) || {},
        }));
        const sortedDoctorRatings = allproductsWithDetails.sort((a, b) => {
          const dateA = new Date(a.modifiedOn);
          const dateB = new Date(b.modifiedOn);
          return dateB - dateA;
        });
        setAlluserDetails(sortedDoctorRatings);

        setCount(
          productRatings.filter(
            (product) => product.productId._id === productId
          ).length
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CommentWithReadMore = ({ comment }) => {
    const [showFullComment, setShowFullComment] = useState(false);

    const toggleReadMore = () => {
      setShowFullComment(!showFullComment);
    };

    const renderComment = () => {
      if (showFullComment || comment.split(" ").length <= 50) {
        return comment;
      } else {
        const words = comment.split(" ");
        const truncatedComment = words.slice(0, 50).join(" ");
        return (
          <>
            {truncatedComment}{" "}
            <span className="read-more text-primary" onClick={toggleReadMore}>
              ...Read more
            </span>
          </>
        );
      }
    };

    return <p>{renderComment()}</p>;
  };

  if (DoctorDetails && alluserdetails && userdetail) {
    return (
      <>
        <Header id="click-service" />
        <div className="container">
          <div className="row">
            <div className="col-12 mt-2">
              <h3>Doctor Profile</h3>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row ">
            <div className="col-lg-3 col-sm-12 mt-2">
              <div className="card shadow-lg">
                <img
                  className="card docz_image"
                  src={DoctorDetails.profileImage}
                ></img>
                <div className="card-body text-center">
                  <h5>{DoctorDetails.doctorName}</h5>
                  <span className="text-secondary">
                    {DoctorDetails.overAllExperience} years of experience
                  </span>
                  <div className="services-text mt-1 d-flex flex-wrap gap-2 justify-content-center">
                    {Array.isArray(DoctorDetails.specialization) &&
                      DoctorDetails.specialization.map(
                        (specialization, index) => (
                          <span
                            key={index}
                            className="border text-primary border-primary rounded-pill p-1"
                          >
                            {specialization}
                          </span>
                        )
                      )}
                  </div>
                  <p className="text-secondary mt-2">
                    {DoctorDetails.overAllQualification}
                  </p>
                  <p className="services-text1">{DoctorDetails.doctorBio}</p>
                </div>
              </div>

              <div className="card shadow-lg mt-2 ">
                <div>
                  <h4 className="mx-4 mt-2 ">Contact</h4>
                  <div className="underline ms-4"></div>
                </div>
                <div className="card-body mx-3">
                  <div>
                    <div className="d-flex gap-1">
                      <div>
                        <span>
                          <MdMarkEmailRead className="icon-email" />
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold text-dark mx-1">Email</span>
                        <br />
                        <span className="text-muted mx-1">
                          {DoctorDetails.email}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-1 mt-2">
                      <div>
                        <span>
                          <FaMobileAlt className="icon-mobile" />
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold text-dark mx-1">
                          Mobile Number
                        </span>
                        <br />
                        <span className="text-muted mx-1">
                          {DoctorDetails.phone}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-1 mt-2">
                      <div>
                        <span>
                          <PiPhoneCallFill className="icon-phone" />
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold text-dark mx-2">
                          Landline Number
                        </span>
                        <br />
                        <span className="text-muted mx-2">
                          {DoctorDetails.landLineNumber}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 scroll-middle col-sm-12 mt-2 mb-5"
              style={{ overflowY: "auto", maxHeight: "850px" }}
              id="scroll-bar-middle"
            >
              <div className="card shadow-lg mb-2">
                <div>
                  <h4 className="mx-4 mt-2 ">Services</h4>
                  <div className="underline ms-4"></div>
                </div>
                <div className="card-body services-text mx-3 d-flex flex-wrap gap-2">
                  {Array.isArray(DoctorDetails.services) &&
                    DoctorDetails.services.map((services, index) => (
                      <span
                        key={index}
                        className="border text-primary border-primary rounded-pill p-1"
                      >
                        {services}
                      </span>
                    ))}
                </div>
              </div>

              <div className="card shadow-lg mb-2">
                <div>
                  <h4 className="mx-4 mt-2 ">Specializations</h4>
                  <div className="underline ms-4"></div>
                </div>
                <div className="card-body mx-3 text-center">
                  <div className="services-text d-flex align-items-center gap-2">
                    {Array.isArray(DoctorDetails.specialization) &&
                      DoctorDetails.specialization.map(
                        (specialization, index) => (
                          <span
                            key={index}
                            className="border text-primary border-primary rounded-pill p-1"
                          >
                            {specialization}
                          </span>
                        )
                      )}
                  </div>
                </div>
              </div>

              <div className="card shadow-lg mb-2">
                <div>
                  <h4 className="mx-4 mt-2 ">Qualifications</h4>
                  <div className="underline ms-4"></div>
                </div>

                <div className="card-body mx-3">
                  {DoctorDetails.qualification &&
                    DoctorDetails.qualification.map((qualify, index) => (
                      <div key={index}>
                        <h6>{qualify.degree}</h6>
                        <p className="text-muted">
                          {qualify.college}
                          <br />
                          {qualify.yearOfPassing}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="card shadow-lg mb-2">
                <div>
                  <h4 className="mx-4 mt-2 ">Experience</h4>
                  <div className="underline ms-4"></div>
                </div>
                <div className="card-body mx-3">
                  {DoctorDetails.experience &&
                    DoctorDetails.experience.map((exp, index) => (
                      <div key={index}>
                        <h6>{exp.role}</h6>
                        <p className="text-muted">
                          {exp.organization}
                          <br />
                          {getMonthYear(exp.from)} - {getMonthYear(exp.to)}{" "}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="card shadow-lg mb-2">
                <div>
                  <h4 className="mx-4 mt-2 ">
                    {DoctorDetails.doctorName} Reviews
                  </h4>
                  <div className="underline ms-4"></div>
                </div>
                <div className="card-body mx-3">
                  <form onSubmit={handleSubmit}>
                    <h6>Full Name</h6>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter your name"
                      value={name}
                      onChange={handlenameChange}
                    />
                    <h6>Treatment</h6>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter treatment"
                      value={title}
                      onChange={handleTitleChange}
                    />
                    <h6>Tell us about your experience</h6>
                    <textarea
                      className="form-control"
                      placeholder="Enter your review"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <h6>Rate your experience</h6>
                    {[0, 1, 2, 3, 4].map((starIndex) => (
                      <span
                        key={starIndex}
                        onClick={() => handleStarClick(starIndex)}
                        value={starIndex}
                        onChange={handleRatingChange}
                        className={`star ${starIndex < rating ? "filled" : ""}`}
                      >
                        {starIndex < rating ? <BsStarFill /> : <BsStar />}
                      </span>
                    ))}
                    <div
                      className="d-flex justify-content-end"
                      onClick={saveProductData}
                    >
                      <button className="btn btn-primary mt-2">
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {Array.isArray(userdetail) && userdetail.length > 0 ? (
                <ul>
                  {userdetail.map((userdetail, index) =>
                    userdetail.doctorId === DoctorId &&
                    (userdetail.comment ||
                      userdetail.rating ||
                      userdetail.title) ? (
                      <div key={index} className="row mt-4 doc_reviews">
                        <div className="col-lg-1 col-2 doc_reviews">
                          {userdetail && (
                            <img
                              src={userdetail.userId.profileImage}
                              className="d-block rounded-5 mt-1 cus-image"
                              alt="..."
                            />
                          )}
                        </div>
                        <div className="col-lg-5 col-8 doc_reviews-font">
                          {userdetail && (
                            <>
                              <span className="mx-3 fw-bold">
                                {userdetail.userId.name}
                              </span>
                              <br />
                              <span className="text-muted mx-3">
                                {localDate(userdetail.modifiedOn)}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="col-lg-5 col-3 d-flex justify-content-end">
                          {[0, 1, 2, 3, 4].map((starIndex) => (
                            <span
                              key={starIndex}
                              value={starIndex}
                              className={` star ${
                                starIndex < userdetail.rating ? "filled" : ""
                              }`}
                            >
                              {starIndex < userdetail.rating ? (
                                <BsStarFill />
                              ) : (
                                <BsStar />
                              )}
                            </span>
                          ))}
                        </div>
                        <div className="col-lg-12 mt-2 mx-2">
                          <h6 className="mt-3 doc_reviewss">
                            {userdetail.title}
                          </h6>
                          <div className="col-lg-11 col-12 doc_reviewss textdesign">
                            <p>
                              <CommentWithReadMore
                                comment={userdetail.comment}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </ul>
              ) : null}

              {Array.isArray(alluserdetails) && alluserdetails.length > 0 ? (
                <ul>
                  {alluserdetails.map((alluserdetails, index) =>
                    alluserdetails.doctorId === DoctorId &&
                    (alluserdetails.comment ||
                      alluserdetails.rating ||
                      alluserdetails.title) ? (
                      <div key={index} className="row mt-4 doc_reviews">
                        <div className="col-lg-1 col-2 doc_reviews">
                          {alluserdetails && (
                            <img
                              src={alluserdetails?.userId?.profileImage}
                              className="d-block rounded-5 mt-1 cus-image"
                              alt="..."
                            />
                          )}
                        </div>
                        <div className="col-lg-5 col-6 doc_reviews-font">
                          {alluserdetails && (
                            <>
                              <span className="mx-3 fw-bold">
                                {alluserdetails.userId.name}
                              </span>
                              <br />
                              <span className="text-muted mx-3">
                                {localDate(alluserdetails.modifiedOn)}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="col-lg-5 col-4 d-flex justify-content-end">
                          {[0, 1, 2, 3, 4].map((starIndex) => (
                            <span
                              key={starIndex}
                              value={starIndex}
                              className={` star ${
                                starIndex < alluserdetails.rating
                                  ? "filled"
                                  : ""
                              }`}
                            >
                              {starIndex < alluserdetails.rating ? (
                                <BsStarFill />
                              ) : (
                                <BsStar />
                              )}
                            </span>
                          ))}
                        </div>
                        <div className="col-lg-12 mt-2 mx-2">
                          <h6 className="mt-3 doc_reviewss">
                            {alluserdetails.title}
                          </h6>
                          <div className="col-lg-11 col-12 doc_reviewss textdesign">
                            <p>
                              <CommentWithReadMore
                                comment={alluserdetails.comment}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </ul>
              ) : null}
            </div>
            <div className="col-lg-3 col-sm-12 mt-2">
              <div className="card shadow-lg ">
                <img className="card"></img>
                <div className="card-body">
                  <div className="">
                    <Appointment />
                  </div>
                </div>
              </div>
              <div className="card shadow-lg mt-2 mb-2">
                <h6 className="mx-2 fw-bold mt-2">Suggested Doctors</h6>

                {suggestedDoctors.slice(-5).map((doctor) => (
                  <div className="d-flex justify-content-between p-1 mt-2 suggested-img">
                    <div className="d-flex justify-content-between">
                      <img className="mx-2" src={doctor.profileImage}></img>
                      <h6 className="mx-2 mt-2 ">{doctor.doctorName}</h6>
                    </div>
                    <Link
                      to={`/doctorprofile?DoctorId=${doctor._id}`}
                      onClick={() => handleViewProfile(doctor)}
                    >
                      <div>
                        <button className="btn btn-primary mt-1 suggested-view">
                          view
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DoctorProfile;
