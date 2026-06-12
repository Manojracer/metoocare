import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import HotSelling from "./Pages/HotSelling/HotSelling";
import Feed from "./Pages/Feed/Feed";
import Doctor from "./Pages/Doctor/Doc_main/Doctor";
import QA from "./Pages/QA/QA";
import ContactUs from "./Pages/ContactUs/ContactUs";
import HSPD1 from "./Pages/HotSelling/HSProductDetails/HSPD1";
import ChatUs from "./Pages/Chatus/ChatUs";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Signup from "./Components/Signup/Signup";
import TrackYourOrder from "./Pages/TrackYourOrder/TrackYourOrder";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Profilepage from "./Pages/Profilepage/Profilepage";
import BuyItNow from "./Pages/HotSelling/BuyItNow/BuyItNow";
import ProfileAddress from "./Pages/ProfileAddress/ProfileAddress";
import ProfileAddressEdit from "./Pages/ProfileAddressEdit/ProfileAddressEdit";
import Profilepageedit from "./Pages/Profilepageedit/Profilepageedit";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import Loginpage from "./Components/Loginpage/Loginpage";
import MyAppointments from "./Pages/MyAppointments/MyAppointments";
import Card from "./Pages/HotSelling/BuyItNow/Card/Card";
import Invoice from "./Pages/Invoice/Invoice";
import DoctorProfile from "./Pages/Doctor/DoctorProfile/DoctorProfile";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import AddToCart  from "./Pages/AddtoCart/Addtocart";
import  Category  from "./Pages/Category/Category";
import Notifications from "./Pages/MyAppointments/Notifications";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/api" element={<h1>INTAGRATION & UI COMPLETED</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/HotSelling" element={<HotSelling />} />
          <Route path="/HSPD" element={<HSPD1 />} />
          <Route path="/BuyItNow" element={<BuyItNow />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Doctor" element={<Doctor/>} />
          <Route path="/QA" element={<QA />} />
          <Route path="/chatUs" element={<ChatUs />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/MyOrder" element={<MyOrder />} />
          <Route path="/OrderDetails" element={<OrderDetails/>} />
          <Route path="/ProfilePage" element={<Profilepage />} />
          <Route path="/ProfilePageedit" element={<Profilepageedit />} />
          <Route path="/ProfileAddress" element={<ProfileAddress />} />
          <Route path="/ProfileAddressEdit" element={<ProfileAddressEdit />} />
          <Route path="/TrackYourOrder" element={<TrackYourOrder />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Card" element={<Card/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/doctorprofile" element={ <DoctorProfile/>} />
          <Route path="/ProductDetails" element={<ProductDetail/> } />
          <Route path="/Addtocart" element={<AddToCart/>} />
          <Route path="/MyAppointments" element={<MyAppointments/>} />
          <Route path="/Category" element={<Category/>} />
          <Route path="/HSPD1" element={<HSPD1/>} />
          <Route path="/notify" element={<Notifications/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
