import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import AdminHome from "./pages/adminHome/AdminHome";
import ServiceAdd from "./pages/ServiceAdd/ServiceAdd";
import ServicesAll from "./pages/ServiceAll/ServicesAll";
import ServiceUpdateForm from "./pages/ServiceAll/ServiceUpdateForm";
import ServiceDetails from "./pages/ServiceAll/ServiceDetails";
import AllEmployeesalarydetailes from "./components/employee salary/AllSalary";
import AddSalary from "./components/employee salary/add Salary/addSalary";
import AllOTSalary from "./components/employee salary/all OT Salary/allOTSalary";
import AllSpecialSalary from "./components/employee salary/all OT Salary/allSpecialLeaving";
import AddOTSalary from "./components/employee salary/Add OT Salary/AddOTSalary";
import AddSpecialSalary from "./components/employee salary/all OT Salary/addSpecailLeaveSalary";
import UpdateSpecial from "./components/employee salary/all OT Salary/updateSpecial";
import SpecialSalaryView from "./components/employee salary/all OT Salary/viewSpecial";
import Update from "./components/employee salary/all OT Salary/UpdateDetailes";
import EmployeeSalaryDetails from "./components/employee salary/all OT Salary/employeeDeatails";
import UpdateOT from "./components/employee salary/all OT Salary/updateOT";
import OTSalaryView from "./components/employee salary/all OT Salary/viewOT";
import Vacanciesdisplay from "./components/job vacancy/Vacanciesdisplay";
import AddVacancy from "./components/admin job vacancy/AddVacancy";
import Application from "./components/Job Application/Application";
import AllApplicationadmin from "./components/All job applications/AllApplicationadmin";
import Shop from "./pages/Home/Shop";
import AddBooking from "./pages/Booking/addBoking";
import OrderDetails from "./pages/Booking/Order details/orderdetails";
import UpdateOrder from "./pages/Booking/Update order/UpdateOrders";
import AddLeaving from "./components/add leave/addleaveform";
import LeavingDetails from "./components/add leave/Leavingdetails";
import UpdateLeaving from "./components/add leave/UpdateLeaving";
import LeavingRepoart from "./components/add leave/Dashboard";
import AddSpecialLeaving from "./components/special leave/addleaveform";
import LeavingSpecialDetails from "./components/special leave/Leavingdetails";
import UpdateSpecialLeaving from "./components/special leave/UpdateLeaving";
import SpecialLeavingRepoart from "./components/special leave/Dashboard";


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path='/getOT/:id'element={<OTSalaryView />}/>
        <Route path='/az' element={<Vacanciesdisplay />}/>
        <Route path='/app' element={<Application />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/createBooking' element={<AddBooking />}/>
        <Route path='/updateorder/:id' element={<UpdateOrder />} />
        <Route path='/updateleaving/:id' element={<UpdateLeaving />} />
        <Route path='/specialdetailsupdate/:id' element={<UpdateSpecialLeaving />}/>

        
        <Route
          path="/adminHome"
          element={
            <Sidebar>
              <Layout>
                <AdminHome />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/seradd"
          element={
            <Sidebar>
              <Layout>
                <ServiceAdd />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/serall"
          element={
            <Sidebar>
              <Layout>
                <ServicesAll />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/serupdateform/:id"
          element={
            <Sidebar>
              <Layout>
                <ServiceUpdateForm />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/serviewda/:id"
          element={
            <Sidebar>
              <Layout>
                <ServiceDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/allSalary"
          element={
            <Sidebar>
              <Layout>
                <AllEmployeesalarydetailes />
              </Layout>
            </Sidebar>
          }
        />
                        <Route
          path="/addSalary"
          element={
            <Sidebar>
              <Layout>
                <AddSalary />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/allOTsalaries"
          element={
            <Sidebar>
              <Layout>
                <AllOTSalary />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/allSpecialsalaries"
          element={
            <Sidebar>
              <Layout>
                <AllSpecialSalary />
              </Layout>
            </Sidebar>
          }
        />
                        <Route
          path="/add"
          element={
            <Sidebar>
              <Layout>
                <AddVacancy />
              </Layout>
            </Sidebar>
          }
        />
                                <Route
          path="/students"
          element={
            <Sidebar>
              <Layout>
                <AllApplicationadmin />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="admin/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
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
                                <Route
          path="/addLeave"
          element={
              <AddLeaving />
          }
        />
        <Route
          path="/leavedetails"
          element={
              <LeavingDetails />
          }
        />
                <Route
          path="/leavedashboard"
          element={
              <LeavingRepoart />
          }
        />
                        <Route
          path="/specialaddd"
          element={
              <AddSpecialLeaving />
          }
        />
                                <Route
          path="/specialdetails"
          element={
              <LeavingSpecialDetails />
          }
        />
                <Route
          path="/specialdashboard"
          element={
              <SpecialLeavingRepoart />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
