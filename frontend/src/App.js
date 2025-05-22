import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddVacancy from "./components/admin job vacancy/AddVacancy";
import AllApplicationadmin from "./components/All job applications/AllApplicationadmin";
import AddOTSalary from "./components/employee salary/Add OT Salary/AddOTSalary";
import AddSpecialSalary from "./components/employee salary/all OT Salary/addSpecailLeaveSalary";
import EmployeeSalaryDetails from "./components/employee salary/all OT Salary/employeeDeatails";
import Update from "./components/employee salary/all OT Salary/UpdateDetailes";
import UpdateOT from "./components/employee salary/all OT Salary/updateOT";
import UpdateSpecial from "./components/employee salary/all OT Salary/updateSpecial";
import SpecialSalaryView from "./components/employee salary/all OT Salary/viewSpecial";
import Application from "./components/Job Application/Application";
import Vacanciesdisplay from "./components/job vacancy/Vacanciesdisplay";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/sidebar/Sidebar"; // Consider removing or commenting out if sidebar is no longer needed
import AdminHome from "./pages/adminHome/AdminHome";
import Forgot from "./pages/auth/Forgot";
import GoogleSuccess from './pages/auth/GoogleSuccess';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import AddBooking from "./pages/Booking/addBoking";
import BookingsList from "./pages/Booking/BookingsList";
import OrderReport from "./pages/Booking/dashboard/Dashboard";
import OrderDetails from "./pages/Booking/Orderdetails/orderdetails";
import UpdateOrder from "./pages/Booking/Updateorder/UpdateOrders";
import Contact from "./pages/contact/Contact";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import ServiceAdd from "./pages/ServiceAdd/ServiceAdd";
import ServicesAll from "./pages/ServiceAll/ServicesAll";
import Services from "./pages/Services/Services";
import { selectUser, setLogin } from "./redux/features/auth/authSlice";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Restore session from localStorage
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      console.log('App.js restoring session:', { user, token });
      dispatch(setLogin({ user, token }));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout><Register /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetpassword/:resetToken" element={<Reset />} />
          <Route path='/addOTSalary' element={<AddOTSalary /> }/>
          <Route path='/addSpecialLeavingSalary' element={<AddSpecialSalary />}/>
          <Route path='/updateSpecial/:id' element={<UpdateSpecial />}/>
          <Route path ='/getSpecial/:id' element={<SpecialSalaryView />}/>
          <Route path='/updateSalary/:id' element={<Update />} />
          <Route path='/get/:id' element={<EmployeeSalaryDetails />}/>
          <Route path='/updateOt/:id' element={<UpdateOT />}/>
          <Route path='/az' element={<Vacanciesdisplay />}/>
          <Route path='/app' element={<Application />}/>
          <Route path='/createBooking' element={<AddBooking />}/>
          <Route path='/updateorder/:id' element={<UpdateOrder />} />
          <Route path='/bookings' element={<BookingsList />} />
          
            <Route
              path="/adminHome"
              element={
                user?.role === "admin" ? (
                  <Sidebar>
                    <AdminHome />
                  </Sidebar>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/seradd"
              element={ user?.role === "admin" ? (
                <Sidebar>
                  <ServiceAdd />
                </Sidebar>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          <Route
            path="/add"
            element={
              user?.role === "admin" ? (
                <Sidebar>
                  <AddVacancy />
                </Sidebar>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/students"
            element={
              user?.role === "admin" ? (
                <Sidebar>
                  <AllApplicationadmin />
                </Sidebar>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/contact-us"
            element={
              user?.role === "admin" ? (
                <Sidebar>
                  <Contact />
                </Sidebar>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        <Route
          path="/contact-us"
          element={
              <Contact />
          }
        />
        <Route
          path="/orderdetails"
          element={
              <OrderDetails />
          }
        />
        <Route
          path="/bookdetails"
          element={
              <OrderDetails />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route
          path="/dashboard"
          element={
            user?.role === "admin" ? (
              <Sidebar>
                <Layout>
                  <OrderReport />
                </Layout>
              </Sidebar>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/serall"
          element={user?.role === "admin" ? (
            <Sidebar>
              <ServicesAll />
            </Sidebar>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
