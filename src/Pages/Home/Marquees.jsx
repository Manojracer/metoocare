import React from "react";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import "./Home.css";
import { getAllBrands } from "../../Api/brand";

const Marquees = () => {
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    getAllLogo();
  }, []);
  const getAllLogo = (event) => {
    event?.preventDefault();
    const data = {
      limit: 6,
    };
    getAllBrands(data)
      .then((res) => {
        setLogo(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Marquee>
        {logo.map((data, index) => (
          <div
            key={index}
            className="col-md-12 marquee_img_size d-flex flex-wrap mb-5 py-2 my-1 text-center"
          >
            <img
              src={data?.profileImage}
              alt={`brandlogo-${index}`}
              className="img-fluid mx-auto col-lg-3 marquee-img mx-5 px-5"
            />
          </div>
        ))}
      </Marquee>
    </>
  );
};

export default Marquees;
