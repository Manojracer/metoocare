import React, { useState, useEffect } from "react";
import "./Marquee.css";
import Marquee from "react-fast-marquee";
import { getAllCarousel } from "../../Api/carousel";

const MyMarquee = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getAllAds();
  }, []);

  const getAllAds = () => {
    getAllCarousel()
      .then((res) => {
        setContent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Marquee className="mycolor" speed={70}>
        {content.map((data, index) => (
          <li key={index} className="list-unstyled mx-4">
            <i className="bi bi-arrow-through-heart fw-bold fs-3 text-danger"></i>
            {data?.content}
          </li>
        ))}
      </Marquee>
    </div>
  );
};

export default MyMarquee;
