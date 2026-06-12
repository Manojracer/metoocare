import "./Home.css";
import Air from "./Assets/Image/aircraft.gif";
import Flag from "./Assets/Image/flag.jpg";
import Support from "./Assets/Image/24-hours-support.gif";
import Payment from "./Assets/Image/credit-card.gif";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Marquees from "./Marquees";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct } from "../../Api/product";
import { getAllCategory } from "../../Api/category";
import { getAllTestimonial } from "../../Api/home";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getAllCarousel } from "../../Api/carousel";

const Home = () => {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  };

  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getProductList();
    getAllAds();
    getCategory();
  }, []);

  const getProductList = () => {
    getAllProduct()
      .then((res) => {
        const value = res?.data?.result;
        setProducts(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllAds = () => {
    getAllCarousel()
      .then((res) => {
        setAds(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  const getCategory = () => {
    getAllCategory()
      .then((res) => {
        setCategory(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCategoryClick = (data) => {
    setSelectedCategory(data);
    applyFilters(data);
    navigate(`/Category?categoryName=${data.categoryName}`);
  };

  const applyFilters = (categoryId) => {
    let filteredProducts = products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.categoryId === categoryId;
      });
    }

    setProducts(filteredProducts);
  };

  //Testimonials
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonial();
  }, []);

  const getTestimonial = () => {
    getAllTestimonial()
      .then((res) => {
        setTestimonials(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <br />
      <div className="container ">
        <div className="row">
          <div className="col">
            <div
              id="carousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-indicators ">
                {ads.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carousel"
                    data-bs-slide-to={index}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => handleIndicatorClick(index)}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner rounded-2">
                {ads.map((data, index) => (
                  <div
                    key={index}
                    id="caro_img"
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={data?.image}
                      className="d-block carsousel img-fluid"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="container mt-lg-0 mt-1 position-absolute start-50 translate-middle-x">
        <div className="d-flex flex-wrap justify-content-center category-img-head-home">
          {category.slice(-8).map((data, index) => (
            <div
              key={index}
              className={`text-center ${
                selectedCategory === data ? "selected-category" : ""
              }`}
              onClick={() => handleCategoryClick(data)}
            >
              <div className="rounded-circle p-3 border custom-bg-colour category_small mt-2 mt-lg-1">
                <img
                  src={data?.categoryImage}
                  width="80"
                  height="80"
                  className="rounded-circle shadow"
                  alt="Power"
                />
              </div>
              <p className="cat_name">{data?.categoryName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="newarrivals mt-4 pt-5 mt-lg-5 pt-lg-5">
        <div className="container mt-2 pt-lg-5">
          <div className="row pt-lg-3">
            <div className="col-lg-6 col-md-12  col-sm-6 mb-sm-0 mb-3 my-sm-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3 fs-3 fw-bold text-black">
                    New Arrivals
                  </h5>
                  <div className="row">
                    {products.length > 0 ? (
                      products
                        .slice(0, getWindowDimensions().width >= 576 ? 6 : 4)
                        .map((product, index) => (
                          <div
                            key={index}
                            className="col-lg-4 col-md-4 col-6 mb-3 mb-sm-0"
                          >
                            <Link
                              to={`/productDetails?productId=${product._id}`}
                              style={{ textDecoration: "none" }}
                              key={product._id}
                            >
                              <div
                                className="card mb-3 border-0"
                                style={{ minHeight: "210px" }}
                              >
                                <div
                                  id="products-bg"
                                  key={index}
                                  className="card-body d-flex small_img_screen flex-column align-items-center border-2 border-dark"
                                >
                                  <a
                                    className="text-decoration-none"
                                    href="#"
                                    alt=""
                                  >
                                    <img
                                      src={product?.productImage}
                                      alt={product?.productName}
                                      width="160"
                                      height="120"
                                      data-aos="flip-right"
                                      data-aos-duration="2300"
                                    />
                                    <p className="fs-6 fw-bold mt-1 text-center text-black mt-4">
                                      {product?.productName}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                    ) : (
                      <p>No products found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* trending */}
            <div className="col-lg-6 col-md-12 col-sm-6 mb-sm-0  mb-3 my-sm-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3 fs-3 fw-bold text-dark">
                    Trending Products
                  </h5>

                  <div className="row">
                    {products.length > 0 ? (
                      products
                        .slice(0, getWindowDimensions().width >= 576 ? 6 : 4)
                        .map((product, index) => (
                          <div
                            key={index}
                            className="col-lg-4 col-md-4 col-6 mb-3 mb-sm-0"
                          >
                            <Link
                              to={`/productDetails?productId=${product._id}`}
                              style={{ textDecoration: "none" }}
                              key={product._id}
                            >
                              <div
                                className="card mb-3  border-0"
                                style={{ minHeight: "230px" }}
                              >
                                <div
                                  id="products-bg"
                                  key={index}
                                  className="card-body d-flex small_img_screen flex-column align-items-center"
                                >
                                  <a
                                    className="text-decoration-none"
                                    href="#"
                                    alt=""
                                  >
                                    <img
                                      src={product?.productImage}
                                      alt={product?.productName}
                                      width="160"
                                      height="120"
                                      data-aos="flip-right"
                                      data-aos-duration="2300"
                                    />
                                    <p className="fs-6 fw-bold mt-1 text-center text-black mt-4">
                                      {product?.productName}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                    ) : (
                      <p>No products found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
      </div>

      {/* collection */}
      <div className="container shadow-lg">
        <div className="row text-center d-flex mt-3 justify-content-center ">
          <h1 className="fs-3 fw-bold text-center mb-3 mt-2 pt-2">
            Featured Collection
          </h1>
          <br />
          {products.length > 0 ? (
            products.slice(-8).map((product, index) => (
              <div className="col-6 col-md-4 col-lg-3 mb-1" key={product._id}>
                <Link
                  to={`/ProductDetails?productId=${product._id}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                      <div className="img_size_fix position-relative">
                        <span className="TCbg badge position-absolute p-2">
                          Save {product.discountPercentage}%
                        </span>
                        <div className="product-container">
                          <div className="image-container">
                            <img
                              src={product.productGif}
                              alt="HS_P_1"
                              className="img-fluid product-gif"
                            />
                            <img
                              src={product.productImage}
                              alt="HS_P_1"
                              className="img-fluid product-img"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="fs-6 fw-bold mt-3 text-black">
                        {product.productName}
                      </div>
                      <div>
                        <span className="bi bi-currency-rupee text-black">
                          {product.discountedPrice}
                        </span>
                        <del className="bi bi-currency-rupee text-muted text-white">
                          {product.finalPrice}
                        </del>
                      </div>
                      <div>
                        {[0, 1, 2, 3, 4].map((starIndex) => (
                          <span
                            key={starIndex}
                            value={starIndex}
                            className={` star ${
                              starIndex < product.rating ? "filled" : ""
                            }`}
                          >
                            {starIndex < product.rating ? (
                              <BsStarFill />
                            ) : (
                              <BsStar />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <br />
        <br />
      </div>
      <br />

      {/* collection  end*/}
      <div className="container mt-5 ">
        <div className="row">
          <div className="card border-0   text-white">
            <img
              className="card-img img-fluid h-75"
              src="https://png.pngtree.com/thumb_back/fh260/background/20220522/pngtree-ecommerce-banner-planning-segmentation-selection-image_1375247.jpg"
              alt="Card image"
            />
            <div className="card-img-overlay mx-5 py-5 supplier-card">
              <h1>Register as Metoo.care Supplier</h1>
              <h6 className="mt-3 mx-2">
                Sell your products to crores of customers
              </h6>
              <ul className="inline-list mt-4">
                <li>
                  <i className="bi bi-check-circle-fill custom-check-circle" />{" "}
                  Grow your business 10x &nbsp; |
                </li>
                <li>
                  <i className="bi bi-check-circle-fill custom-check-circle" />{" "}
                  Enjoy 100% Profit &nbsp; |
                </li>
                <li>
                  <i className="bi bi-check-circle-fill custom-check-circle" />{" "}
                  Sell all over India
                </li>
              </ul>
              <div className="supplier-btn">
                <Link to="https://panel.metoo.care/">
                  <button className="mt-3 mx-5 btn btn-outline-light small-text">
                    Sign Up now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div class="row">
          <h4 className="d-flex justify-content-center text-center mb-3">
            Why Choose Us?
          </h4>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card border-0">
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img
                    src={Air}
                    alt="air"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                  ></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  FAST SHIPPING
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    Free and Fast Shipping across India {"\u00a0"}
                    {"\u00a0"}
                    <img src={Flag} alt="flag_img"></img>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card border-0">
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img
                    src={Support}
                    alt="air"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                  ></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  SUPPORT 24/7
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    You will speak with one of our courteous representatives
                    within 24 hours..
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card border-0">
              <div class="card-body  img_size_air">
                <div className="d-flex justify-content-center text-center">
                  <img
                    src={Payment}
                    alt="air"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                  ></img>
                </div>
                <br />
                <h4 className="fw-bold d-flex justify-content-center text-center">
                  SECURE PAYMENT
                </h4>
                <div className="flag_img">
                  <span className=" d-flex justify-content-center text-center">
                    Your safety is our priority. All payments are 100% secure.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>

      <div className="container border shadow-lg">
        <div className="row">
          <div className="col text-center">
            <h1>TOP BRANDS</h1>
            <Marquees />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h3 className="fs-2 fw-bold text-center">Testimonials</h3>
        <br />
        <Swiper
          spaceBetween={14}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={breakpoints}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="card custom-card"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
              >
                <div className="card-body testimonial_color">
                  <div className="d-flex flex-wrap">
                    <img
                      className="img_pro_ic_tep"
                      src={testimonial?.panelId?.profileImage}
                      alt="Profile"
                    />
                    <h3 className="text-black mx-2 mt-1">
                      {testimonial?.panelId?.companyName}
                    </h3>
                  </div>
                  <p className="font_size_rev mt-2 mx-4">
                    {testimonial.comment}
                  </p>
                  <div className="star_ratee">
                    <span className="fw-bold text-black mx-2">Rating:</span>
                    <span className="mx-3">
                      {[0, 1, 2, 3, 4].map((starIndex) => (
                        <span
                          key={starIndex}
                          value={starIndex}
                          id="star_col"
                          className={`star ${
                            starIndex < testimonial.rating ? "filled" : ""
                          }`}
                        >
                          {starIndex < testimonial.rating ? (
                            <BsStarFill />
                          ) : (
                            <BsStar />
                          )}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        <div className="row ">
          <div className="col-sm-12 mb-5">
            <h1 className="fs-bold text-center  md-fs-6 sexify_color">
              At Metoo.care!
            </h1>
            <h6 className="text-center fw-bold fs-3">
              Where Wellness Unveils its Secrets!
            </h6>
            <p className="text-center text-muted home-bio">
              Welcome to Metoo.care, where we redefine your shopping experience
              as a gateway to wellness, vitality, and personalized care. More
              than just an online store, Metoo.care is your destination for
              innovative adult products, health-boosting powders, rejuvenating
              tablets, and confidential doctor consultations. Our commitment to
              your well-being propels us to curate a unique collection that not
              only meets your needs but surpasses your expectations. Embark on a
              journey with Metoo.care and discover a world of cutting-edge
              solutions for a healthier and more fulfilling lifestyle.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
