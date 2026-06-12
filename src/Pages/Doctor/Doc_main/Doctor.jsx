import React, { useState, useEffect } from "react";
import "./Doctor.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import Button from "@mui/material/Button";
import { getAllDoctor, getSampleDoctor } from "../../../Api/doctorprofile";
import { Select, MenuItem } from "@mui/material";
import { isAuthenticated } from "../../../Utils/Auth";
import { Link } from "react-router-dom";
function Doctor() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllDoctors();
    } else {
      getSampleDoctors();
    }
  }, [isLoggedIn]);

  const getAllDoctors = () => {
    getAllDoctor()
      .then((res) => {
        const allDoctors = res?.data?.result;
        const filteredDoctors = selectedSpecialization
          ? allDoctors.filter((doctor) =>
              doctor.specialization.includes(selectedSpecialization)
            )
          : allDoctors;

        setDoctors(filteredDoctors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSampleDoctors = () => {
    getSampleDoctor()
      .then((res) => {
        const allDoctors = res?.data?.result;
        const filteredDoctors = selectedSpecialization
          ? allDoctors.filter((doctor) =>
              doctor.specialization.includes(selectedSpecialization)
            )
          : allDoctors;

        setDoctors(filteredDoctors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  const handleClearFilter = (event) => {
    setSelectedSpecialization("");
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <br />
      <div className="container">
        <div className="row">
          <div className=" d-flex justify-content-between flex-wrap">
            <div className="col-sm-6 right d-flex  ">
              <h1>Doctors List</h1>
            </div>
            <div className=" col-sm-6 left ms-auto  d-flex justify-content-end ">
              <div className=" filter-section">
                <Select
                  value={selectedSpecialization}
                  onChange={handleSpecializationChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Specialization" }}
                >
                  <MenuItem value="" disabled>
                    Select Specialization
                  </MenuItem>
                  <MenuItem value="Anthrologist">Andrologist</MenuItem>
                  <MenuItem value="Cardiologist">Cardiology</MenuItem>
                  <MenuItem value="Gynecologist">Gynecologist</MenuItem>
                  <MenuItem value="Sexologist">Sexology</MenuItem>
                  <MenuItem value="Urology">Neurologist</MenuItem>
                </Select>
                <Button
                  id="filter_buttn"
                  variant="contained"
                  onClick={getAllDoctors}
                >
                  Apply
                </Button>
                <Button variant="outlined" onClick={handleClearFilter}>
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="col-12 d-flex flex-wrap px-1 doc-list">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div
                  className="card mb-4 mx-1 shadow-lg"
                  key={doctor.id}
                  style={{ width: "20rem" }}
                >
                  <img
                    src={doctor?.profileImage}
                    height={"320px"}
                    className="card-img-top "
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4>{doctor?.doctorName}</h4>
                    </div>
                    <p className="chan_fon_s">{doctor?.doctorBio}</p>

                    <div className="justify-content-between">
                      <div className="d-flex ">
                        {isLoggedIn ? (
                          <Link
                            to={`/doctorprofile?DoctorId=${doctor._id}`}
                            onClick={() => handleViewProfile(doctor)}
                          >
                            <div className="btn_pop_cjj">
                              <button type="button" className="btn1">
                                <div className="doctor_text">
                                  <i className="bi bi-person-circle"></i> View
                                  Profile
                                </div>
                              </button>
                            </div>
                          </Link>
                        ) : (
                          <Link to="/login">
                            <div className="btn_pop_cjj">
                              <button type="button" className="btn1">
                                <div className="doctor_text">
                                  <i className="bi bi-person-circle"></i> View
                                  Profile
                                </div>
                              </button>
                            </div>
                          </Link>
                        )}

                        <Link to="/PaymentPage">
                          <div className="btn_pop_cjj">
                            <button type="button" className="btn2 ">
                              <div className="text-primary doctor_text">
                                <i className="bi bi-chat-dots"></i> Send message
                              </div>
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Doctors to show</div>
            )}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Doctor;
