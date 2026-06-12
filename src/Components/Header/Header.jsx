import React, { useState, useEffect } from "react";
import "./Header.css";
import Marquee from "../../Components/Maquee/Marquee";
import metoo from "../../Assests/images/Image-vdfidi.jpeg";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { clearStorage } from "../../Utils/Storage";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Utils/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";
import { HotSellingWeb } from "../../Api/hotselling";
import { BsSearch } from "react-icons/bs";
import { Link} from "react-router-dom";
import {  Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Notifications from "../../Pages/MyAppointments/Notifications.jsx";
import { Button, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'; //redux
const Header = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };
 
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open4, setOpen4] = React.useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  
  const submit2 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [isResponsive, setResponsive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const toggleResponsive = () => {
    setResponsive(!isResponsive);
  };

  const handleLogout = () => {
    clearStorage();
    setIsLoggedIn(false);
    toast.success("You have logged out successfully.");
    navigate("/");
  };

  const performSearch = () => {
    setIsSearching(true);
    HotSellingWeb(searchQuery)
      .then((data) => {
        if (data.data.result) {
          const orders = data.data.result.productList;
          const filteredResults = orders.filter((order) => {
            return order.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          });
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Search Error:", error);
        setSearchResults([]);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery]);

  const cartDatas = useSelector(state => state.cart.cartData.result || []); // Accessing cartData from result array

const cartDatass = cartDatas[0] || {}; // Get the first element of cartDatas, or an empty object if it's undefined

const cartdata = cartDatass.totalQuantity || 0; // Accessing totalQuantity

const getTotal = () => {
  console.log("Total Quantity:", cartdata);
}

useEffect(() => {
  getTotal();
}, []); // Empty dependency array to ensure useEffect runs only once after initial render


  return (
    <>
      <Marquee />
      <div className="change_bac_colo_text  container-fluid">
        <div className="">
          <div className="container mx-md-auto">
            <div className=" row ">
              <nav
                className=" navbar navbar-expand-lg navbar-light"
                id="small_container"
              >
                <a className=" col-2 d-flex justify-content-center navbar-brand fw-bold fs-4  " href="/">
                  <img
                    src={metoo}
                    alt="metoo Logo"
                    className="logosize change_clr_logo"
                  />
                </a>
                {isSmallScreen ? (
                <>
                 <div className="col-2 d-flex justify-content-center ms-2 navbar-brand2">
                              <li className="nav-item   ">
                                <a
                                  className="nav-link"
                                  onClick={submit2}
                                  href="javascript:void(0)"
                                  id="icon-down"
                                >
                                  <i className="bi bi-search text-white"></i>
                                </a>
                              </li>
                            </div>

                            <Modal
                              open={open4}
                              onClose={handleClose4}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box className="container w-100 h-lg-75 h-sm-100 bg-white mt-5 mb-5 rounded">
                                <div className="d-flex justify-content-end postion-absolute">
                                  <Button
                                    onClick={() => {
                                      handleClose4();
                                    } }
                                  >
                                    <IoMdClose className="fw-bold w-75 h-75 " />
                                  </Button>
                                </div>

                                <div className="modal-body">
                                  <div className="d-flex justify-content-center">
                                    <input
                                      className="form-control p-3"
                                      placeholder="Search for..."
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)} />
                                    <button
                                      className="btn btn-primary "
                                      type="button"
                                    >
                                      <BsSearch />
                                    </button>
                                  </div>

                                  {isSearching && <p>Loading...</p>}
                                  {searchQuery && searchResults.length > 0 ? (
                                    <div className="row d-flex justify-content-center mt-5">
                                      {searchResults
                                        .slice(-4)
                                        .map((product, index) => (
                                          <div
                                            className="col-6 col-md-4 col-lg-3 mb-3"
                                            key={product._id}
                                          >
                                            <Link
                                              to={`/ProductDetails?productId=${product._id}`}
                                              className="text-decoration-none"
                                            >
                                              <div className="card">
                                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                  <div className="img_size_fix position-relative">
                                                    <span className="TCbg badge position-absolute p-2">
                                                      Save{" "}
                                                      {product.discountPercentage}%
                                                    </span>
                                                    <div className="product-container">
                                                      <div className="image-container">
                                                        <img
                                                          src={product.productGif}
                                                          alt="HS_P_1"
                                                          className="img-fluid product-gif" />
                                                        <img
                                                          src={product.productImage}
                                                          alt="HS_P_1"
                                                          className="img-fluid product-img" />
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
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                        ))}
                                    </div>
                                  ) : (
                                    <div className="p-3"></div>
                                  )}
                                </div>
                              </Box>
                            </Modal>
                            <div className="col-2 d-flex justify-content-center navbar-brand3">
    <li className="nav-item">
        <a className="nav-link" href="javascript:void(0)">
            <Link to="/Addtocart">
                <i className="bi bi-cart-dash text-white" style={{ fontSize: '20px', position: 'relative' }}>
                    {cartdata > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            backgroundColor: '#900FD2',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '6px',
                            fontSize: '12px',
                            height: '25px',
                            width: '25px',
                            textAlign: 'center',
                        }}>
                            {cartdata}
                        </span>
                    )}
                </i>
            </Link>
        </a>
    </li>
</div>


                           

                           
                                  {/* Notifications */}
                                  <div className="col-2 d-flex justify-content-center  navbar-brand2 ">
                                    <li class="nav-item ">  
                                      <a
                                        class="nav-link"
                                        href="javascript:void(0)"
                                        id="notify-icon-down"
                                      >
                                        <div className="pop-colorr" id="popoverBtn">
                                          <i class="bi bi-bell text-white "></i>
                                          <Popover
                                            style={{
                                              maxHeight: "500px",
                                              overflowY: "auto",
                                            }}
                                            id="pop-bodyy"
                                            placement="bottom"
                                            isOpen={popoverOpen}
                                            target="popoverBtn"
                                            toggle={togglePopover}
                                          >
                                            <PopoverHeader id="pop-headerr">
                                              Notifications
                                            </PopoverHeader>
                                            <PopoverBody id="pop-bodyy">
                                              <Notifications />
                                            </PopoverBody>
                                          </Popover>
                                        </div>
                                      </a>
                                    </li>
                                  </div>
                               
                          
                <Button className="  navbar-toggler bg-light" onClick={toggleDrawer(true)}>
                  {drawerOpen ? <FaTimes /> : <FaBars />}
                </Button>
               
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} >
                  <List>
                    
                 
                     <ListItem >
                      <ListItemText>
                      <ul className="navbar-nav   mb-3 ">
                        
                            <div className="col-sm-1 text-center">
                              <li class="nav-item ">
                                <a
                                  class="nav-link fw-bold fs-6  p-3 "
                                  href="/"
                                >
                                  Home
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item contents ">
                                <a
                                  class="nav-link fw-bold fs-6   p-3 "
                                  href="/HotSelling"
                                >
                                  HotSelling
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold  fs-6  p-3 "
                                  href="/Doctor"
                                >
                                  Doctor
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-4 ">
                                <a
                                  class="nav-link fw-bold  fs-6   p-3"
                                  href="/Feed"
                                >
                                  Feed
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold fs-6   p-3 "
                                  href="/QA"
                                >
                                  Q&A
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold fs-6  p-3"
                                  href="/PaymentPage"
                                >
                                  Chat
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item ">
                                <a
                                  class="nav-link fw-bold fs-6  p-3 "
                                  href="/ContactUs"
                                >
                                  Contact
                                </a>
                              </li>
                            
                            </div>
                            <div className="col-sm-1 d-flex justify-content-center text-center ">
                              
                               
                              {isLoggedIn ? (
                              <div className="">
                                <li class=" mt-2">
                                  <div
                                    class="dropdown text-primary "
                                    id="icon-down1"
                                  >
                                    <a
                                      href="#"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i class="bi bi-person-circle  text-black mt-1"></i>
                                    </a>

                                    <ul class="dropdown-menu dropdownlistcolor">
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold "
                                          href="/ProfilePage"
                                        >
                                          My Profile
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold"
                                          href="/ProfileAddress"
                                        >
                                          My Address
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold"
                                          href="/MyOrder"
                                        >
                                          My Order
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold"
                                          href="/MyAppointments"
                                        >
                                          My Appointments
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold"
                                          href="/TrackYourOrder"
                                        >
                                          Track your Order
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item fw-bold"
                                          href="/"
                                          onClick={handleLogout}
                                        >
                                          Logout
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </div>
                            
                          ) : (
                            <div className="">
                              <div className="">
                                <li className="nav-item  ">
                                  <a href="/login">
                                    <button type="button" className="btn-style">
                                      Login
                                    </button>
                                  </a>
                                </li>
                                <li className="nav-item mx-1 mt-2 mb-5 ">
                                  <a href="/SignUp">
                                    <button type="button" className="btn-style">
                                      SignUp
                                    </button>
                                  </a>
                                </li>
                              </div>
                            </div>
                          )}
                        </div>
                            {/* Search Box input box */}
                        
                      </ul>
                        </ListItemText>
                    </ListItem>
                  
              
                  </List>
                </Drawer>
              </>
            ) : (
              <div className={`collapse navbar-collapse color_chng`}>
                      <ul className="navbar-nav me-auto mb-3 bg-dark">
                        <div className="container">
                          <div className="row mx-1">
                            <div className="col-sm-1 text-center">
                              <li class="nav-item ">
                                <a
                                  class="nav-link fw-bold fs-6 text-white p-3 "
                                  href="/"
                                >
                                  Home
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item contents ">
                                <a
                                  class="nav-link fw-bold fs-6 text-white  p-3 "
                                  href="/HotSelling"
                                >
                                  HotSelling
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold  fs-6  text-white p-3 "
                                  href="/Doctor"
                                >
                                  Doctor
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-4 ">
                                <a
                                  class="nav-link fw-bold  fs-6  text-white p-3"
                                  href="/Feed"
                                >
                                  Feed
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold fs-6  text-white p-3 "
                                  href="/QA"
                                >
                                  Q&A
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item mx-3 ">
                                <a
                                  class="nav-link fw-bold fs-6 text-white p-3"
                                  href="/PaymentPage"
                                >
                                  Chat
                                </a>
                              </li>
                            </div>

                            <div className="col-sm-1 text-center">
                              <li class="nav-item ">
                                <a
                                  class="nav-link fw-bold fs-6 text-white p-3 "
                                  href="/ContactUs"
                                >
                                  Contact
                                </a>
                              </li>
                            
                            </div>

                            {/* Search Box input box */}
                            <div className="col-1 text-center">
                              <li className="nav-item col-2  ">
                                <a
                                  className="nav-link"
                                  onClick={submit2}
                                  href="javascript:void(0)"
                                  id="icon-down"
                                >
                                  <i className="bi bi-search text-white"></i>
                                </a>
                              </li>
                            </div>
                            <Modal
                              open={open4}
                              onClose={handleClose4}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box className="container w-100 h-lg-75 h-sm-100 bg-white mt-5 mb-5 rounded">
                                <div className="d-flex justify-content-end postion-absolute">
                                  <Button
                                    onClick={() => {
                                      handleClose4();
                                    } }
                                  >
                                    <IoMdClose className="fw-bold w-75 h-75 " />
                                  </Button>
                                </div>

                                <div className="modal-body">
                                  <div className="d-flex justify-content-center">
                                    <input
                                      className="form-control p-3"
                                      placeholder="Search for..."
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)} />
                                    <button
                                      className="btn btn-primary "
                                      type="button"
                                    >
                                      <BsSearch />
                                    </button>
                                  </div>

                                  {isSearching && <p>Loading...</p>}
                                  {searchQuery && searchResults.length > 0 ? (
                                    <div className="row d-flex justify-content-center mt-5">
                                      {searchResults
                                        .slice(-4)
                                        .map((product, index) => (
                                          <div
                                            className="col-6 col-md-4 col-lg-3 mb-3"
                                            key={product._id}
                                          >
                                            <Link
                                              to={`/ProductDetails?productId=${product._id}`}
                                              className="text-decoration-none"
                                            >
                                              <div className="card">
                                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                  <div className="img_size_fix position-relative">
                                                    <span className="TCbg badge position-absolute p-2">
                                                      Save{" "}
                                                      {product.discountPercentage}%
                                                    </span>
                                                    <div className="product-container">
                                                      <div className="image-container">
                                                        <img
                                                          src={product.productGif}
                                                          alt="HS_P_1"
                                                          className="img-fluid product-gif" />
                                                        <img
                                                          src={product.productImage}
                                                          alt="HS_P_1"
                                                          className="img-fluid product-img" />
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
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                        ))}
                                    </div>
                                  ) : (
                                    <div className="p-3"></div>
                                  )}
                                </div>
                              </Box>
                            </Modal>
                           
                             <div className="col-sm-1 text-center prof-head1">
    <li className="nav-item">
        <a className="nav-link" href="javascript:void(0)" id="cart-icon-down">
            <Link to="/Addtocart">
                <div style={{ position: 'relative' }}>
                <i className="bi bi-cart-dash text-white" style={{ fontSize: '18px' }}></i>

                    {cartdata > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '-10px', // Adjust the position as needed
                            right: '12px', // Adjust the position as needed
                            backgroundColor: '#900FD2',
                            color: 'white',
                            borderRadius: '60%',
                            padding: '5px',
                            fontSize: '12px',
                            height: '25px',
                            width: '25px',
                        }}>
                            {cartdata}
                        </div>
                    )}
                </div>
            </Link>
        </a>
    </li>
</div>



                            <div className="col-2 text-center d-flex">
                              {isLoggedIn ? (
                                <div className=" d-flex prof-head">
                                  {/* Notifications */}
                                  <div className="col-2 text-center">
                                    <li class="nav-item ">
                                      <a
                                        class="nav-link"
                                        href="javascript:void(0)"
                                        id="notify-icon-down"
                                      >
                                        <div className="pop-colorr" id="popoverBtn">
                                          <i class="bi bi-bell text-white "></i>
                                          <Popover
                                            style={{
                                              maxHeight: "500px",
                                              overflowY: "auto",
                                            }}
                                            id="pop-bodyy"
                                            placement="bottom"
                                            isOpen={popoverOpen}
                                            target="popoverBtn"
                                            toggle={togglePopover}
                                          >
                                            <PopoverHeader id="pop-headerr">
                                              Notifications
                                            </PopoverHeader>
                                            <PopoverBody id="pop-bodyy">
                                              <Notifications />
                                            </PopoverBody>
                                          </Popover>
                                        </div>
                                      </a>
                                    </li>
                                  </div>

                                  <div className="pro">
                                    <li class="nav-item mt-2">
                                      <div
                                        class="dropdown text-primary "
                                        id="icon-down1"
                                      >
                                        <a
                                          href="#"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i class="bi bi-person-circle  text-white mt-1"></i>
                                        </a>

                                        <ul class="dropdown-menu dropdownlistcolor">
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold "
                                              href="/ProfilePage"
                                            >
                                              My Profile
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold"
                                              href="/ProfileAddress"
                                            >
                                              My Address
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold"
                                              href="/MyOrder"
                                            >
                                              My Order
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold"
                                              href="/MyAppointments"
                                            >
                                              My Appointments
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold"
                                              href="/TrackYourOrder"
                                            >
                                              Track your Order
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              class="dropdown-item fw-bold"
                                              href="/"
                                              onClick={handleLogout}
                                            >
                                              Logout
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  </div>
                                </div>
                              ) : (
                                <div className="log-head">
                                  <div className="d-sm-flex">
                                    <li className="nav-item  p-2 ">
                                      <a href="/login">
                                        <button type="button" className="btn-style">
                                          Login
                                        </button>
                                      </a>
                                    </li>
                                    <li className="nav-item mx-1   p-2 ">
                                      <a href="/SignUp">
                                        <button type="button" className="btn-style">
                                          SignUp
                                        </button>
                                      </a>
                                    </li>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                 )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
