import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Navigate } from "react-router";

export default function Navbar(props) {
  const { User } = props;
  let Links = [];
  if (User?.user?.isAdmin) {
    Links = [
      {
        id: 1,
        name: "Portfolio",
        link: "/portfolio",
      },
      {
        id: 2,
        name: "Wealth Chart",
        link: "/wealth-chart",
      },
      {
        id: 3,
        name: "Records",
        link: "/records",
      },
      {
        id: 4,
        name: "Users",
        link: "/users",
      },
      {
        id: 5,
        name: "Change Password",
        link: "/change-password",
      },
      {
        id: 6,
        name: "Logout",
        link: "/logout",
      },
    ];
  } else if (User?.user?.isAdmin === false) {
    Links = [
      {
        id: 1,
        name: "Portfolio",
        link: "/portfolio",
      },
      {
        id: 2,
        name: "Wealth Chart",
        link: "/wealth-chart",
      },
      {
        id: 3,
        name: "Records",
        link: "/records",
      },
      {
        id: 4,
        name: "Change Password",
        link: "/change-password",
      },
      {
        id: 5,
        name: "Logout",
        link: "/logout",
      },
    ];
  } else {
    Links = [
      {
        id: 1,
        name: "Login",
        link: "/",
      },
      {
        id: 2,
        name: "Register",
        link: "/register",
      },
    ];
  }

  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="shadow-lg w-full fixed top-0 left-0 z-20">
      <div className="md:flex items-center justify-between bg-emerald-600 py-2 text-white md:px-10 px-7">
        <div className="font-bold text-2xl  flex items-center text-justify">
          <span className="md:text-5xl text-3xl mr-1 cursor-pointer">
            <FontAwesomeIcon
              icon={faDollarSign}
              onClick={() => {
                navigate("/portfolio");
              }}
            />
          </span>
          My Financial Pal
        </div>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="text-2xl absolute right-8 top-2 cursor-pointer md:hidden"
        >
          <FontAwesomeIcon icon={openMenu ? faXmark : faBars} />
        </div>
        <ul
          className={`md:flex md:items:center md:pb-0 pb-1 md:static md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-in absolute bg-emerald-600 ${
            openMenu ? "top-10 opacity-100" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          {Links.map((link) => (
            <li
              key={link.id}
              className="md:ml-8 md:text-sm lg:text-lg text-lg md:my-0 my-7 md:mx-0 mx-5"
            >
              <a
                href={link.link}
                className="text-white hover:text-gray-300 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
