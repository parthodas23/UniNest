import React from "react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <>
      <div className="bg-white sticky border-b-white shadow-sm x-50 top-0">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <h1 className="cursor-pointer">UniNest</h1>
          </div>
          <div>
            <ul className=" flex space-x-7">
              <li
                onClick={() => {
                  navigate("/");
                }}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-500  ${
                  pathMathRoute("/") && "border-b-[3px]"
                }`}
              >
                Home
              </li>
              <li
                onClick={() => navigate("/list-room")}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-500  ${
                  pathMathRoute("/list-room") && "border-b-[3px]"
                }`}
              >
                ListRoom
              </li>
              <li
                onClick={() => navigate("/signin")}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-500  ${
                  pathMathRoute("/signin") && "border-b-[3px]"
                }`}
              >
                SignIn
              </li>
              <li
                onClick={() => navigate("/profile")}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-500  ${
                  pathMathRoute("/profile") && "border-b-[3px]"
                }`}
              >
                Profile
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
