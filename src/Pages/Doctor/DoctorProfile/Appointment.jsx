import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserId } from "../../../Utils/Storage";
import { bookDoctorAppointment } from "../../../Api/bookAppoinment";
import { getsingleuser } from "../../../Api/user";
import { format } from "date-fns";

function Appointment() {
  let [searchParams] = useSearchParams();
  let DoctorId = searchParams.get("DoctorId");

  const initialState = {
    userId: getUserId(),
    doctorId: DoctorId,
    name: "",
    mobileNumber: "",
    scheduleTime: "",
    scheduleDate: "",
  };
  const initialStateErrors = {
    scheduleTime: { required: false },
    scheduleDate: { required: false },
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    getUserDetails();
    setCurrentDate(new Date());
  }, []);

  const [selectedSession, setSelectedSession] = useState("morning");
  const [inputs, setInputs] = useState(initialState);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleSessionChange = (session) => {
    setSelectedSession(session);
    setInputs({ ...inputs, scheduleTime: "" });
  };

  const generateTimeSlots = () => {
    let startTime, endTime;

    if (selectedSession === "morning") {
      startTime = 10 * 60;
      endTime = 14 * 60;
    } else if (selectedSession === "evening") {
      startTime = 17 * 60;
      endTime = 21 * 60;
    } else {
      startTime = 0;
      endTime = 0;
    }

    const timeSlots = [];

    for (let minutes = startTime; minutes <= endTime; minutes += 15) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;

      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? "AM" : "PM";

      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute} ${period}`;
      timeSlots.push(time);
    }

    return timeSlots;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.scheduleDate === "") {
      error.scheduleDate.required = true;
    }

    if (data.scheduleTime === "") {
      error.scheduleTime.required = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const getUserDetails = () => {
    const user = getUserId();
    getsingleuser(user)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      bookDoctorAppointment(inputs)
        .then((res) => {
          toast.success("Your appointment is booked successfully");
          setInputs(initialState);
          setSubmitted(false);
          setSelectedSession("morning");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <form onSubmit={handleSubmit}>
            <div className=" f_ch_doc_na">
              <div>
                <h1 className="fs-5 text-danger" id="staticBackdropLabel">
                  Book Your Slot!
                </h1>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">
                  <b>Name:</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  value={inputs?.name}
                  name="name"
                  onChange={handleInputs}
                  placeholder="Enter your name"
                />
              </div>

              <div class="mb-3">
                <label for="mobileNumber" class="form-label">
                  <b>Mobile:</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={inputs?.mobileNumber}
                  onChange={handleInputs}
                  maxLength={10}
                  placeholder="Enter your phone number"
                />
              </div>
              <div class="form-group">
                <label for="selectDate">
                  <b>Select Date:</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="selectDate"
                  name="scheduleDate"
                  value={inputs?.scheduleDate}
                  onChange={handleInputs}
                  min={format(currentDate, "yyyy-MM-dd")}
                />
                {errors?.scheduleDate.required ? (
                  <span className="text-danger form-text profile_error">
                    This field is required.
                  </span>
                ) : null}
              </div>
              <div class="form-group mt-2">
                <label for="selectSession">
                  <b>Select Session:</b>
                </label>
                <br />
                <div class="" role="group">
                  <button
                    type="button"
                    class="btn btn-light mr-2"
                    value="morning"
                    onClick={() => handleSessionChange("morning")}
                  >
                    Morning
                  </button>
                  <button
                    type="button"
                    class="btn btn-light"
                    value="evening"
                    onClick={() => handleSessionChange("evening")}
                  >
                    Evening
                  </button>
                </div>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="slots">
                  <b>Available Time Slots:</b>
                </label>
                <br />
                <select
                  id="slots"
                  name="scheduleTime"
                  className="form-control"
                  value={inputs?.scheduleTime ?? ""}
                  onChange={handleInputs}
                >
                  <option value={""} disabled hidden>
                    Select Slots
                  </option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors?.scheduleTime.required ? (
                  <span className="text-danger form-text profile_error">
                    This field is required.
                  </span>
                ) : null}
              </div>

              <div className="mt-4 mx-4">
                <button className="btn btn-primary" type="submit">
                  Confirm Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Appointment;
