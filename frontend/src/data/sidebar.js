import { BiImageAdd } from "react-icons/bi"; // Icon for Service
import { FaPaintBrush } from "react-icons/fa"; // Icon for Service
import { IoIosBriefcase } from "react-icons/io"; // Icon for Jobs
import { MdBallot } from "react-icons/md"; // Icon for Service
import { RiAdminFill, RiCalendar2Fill } from "react-icons/ri"; // Icon for Admin Home

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
  // {
  //   title: "Contact Us",
  //   icon: <FaCommentAlt />,
  //   path: "/admin/contact-us",
  // },
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
    title: "Bookings",
    icon: <RiCalendar2Fill />,
    path: "/orderdetails",
      // {
      //   title: "Bookings List",
      //   path: "/bookings",
      // },
  },
];

export default menu;
