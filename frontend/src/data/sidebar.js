import { FaTh, FaRegChartBar, FaCommentAlt, FaHome, FaStore, FaPaintBrush } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdBallot } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri"; // Icon for Admin Home
import { FiUsers } from "react-icons/fi"; // Icon for Account
import { AiFillSchedule } from "react-icons/ai"; // Icon for Salary
import { IoIosBriefcase } from "react-icons/io"; // Icon for Jobs
import { RiCalendar2Fill } from "react-icons/ri"; // Icon for Booking
import { BsExclamationTriangleFill } from "react-icons/bs"; // Icon for Leaving

const menu = [
  {
    title: "Admin Home",
    icon: <RiAdminFill />,
    path: "/adminHome",
  },
  {
    title: "Service",
    icon: <FaPaintBrush />,
    childrens: [
      {
        title: "All Service",
        icon: <MdBallot />,
        path: "/serall",
      },
      {
        title: "Add Service",
        icon: <BiImageAdd />,
        path: "/seradd",
      },
    ],
  },
  {
    title: "Inventory",
    icon: <FaStore />,
    childrens: [
      {
        title: "All Products",
        icon: <FaTh />,
        path: "/dashboard",
      },
      {
        title: "Add Product",
        icon: <BiImageAdd />,
        path: "/add-product",
      },
    ],
  },
  {
    title: "Account",
    icon: <FiUsers />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact Us",
    icon: <FaCommentAlt />,
    path: "/admin/contact-us",
  },
  {
    title: "Salary",
    icon: <AiFillSchedule />,
    childrens: [
      {
        title: "Add Salary",
        path: "/addSalary",
      },
      {
        title: "All Employee Salary",
        path: "/allSalary",
      },
      {
        title: "All OT Salary",
        path: "/allOTsalaries",
      },
      {
        title: "All Special Salary",
        path: "/allSpecialsalaries",
      },
    ],
  },
  {
    title: "Jobs",
    icon: <IoIosBriefcase />,
    childrens: [
      {
        title: "Add job vacancy",
        path: "/add",
      },
      {
        title: "All Recieved applications",
        path: "/students",
      },
    ],
  },
  {
    title: "Booking",
    icon: <RiCalendar2Fill />,
    childrens: [
      {
        title: "All Bookings",
        path: "/orderdetails",
      },
      {
        title: "Booking Summary",
        path: "/bookdetails",
      },
    ],
  },
  {
    title: "Leaving",
    icon: <BsExclamationTriangleFill />,
    childrens: [
      {
        title: "Add leave",
        path: "/addLeave",
      },
      {
        title: "Leave details",
        path: "/leavedetails",
      },
      {
        title: "all Special leave",
        path: "/leavedetails",
      },
      {
        title: "Add Special leave",
        path: "/specialaddd",
      },
      {
        title: "Special leaving",
        path: "/specialdetails",
      },
      {
        title: "Special leaving dashboard",
        path: "/specialdashboard",
      },
    ],
  },
];

export default menu;
