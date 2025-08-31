import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const [pageState, setPageState] = useState("SignIn");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("SignIn");
      }
    });
  }, [auth]);

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <>
      <div className="bg-white sticky border-b-white shadow-sm z-40 top-0">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <h1
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer text-purple-500 font-bold text-xl"
            >
              🎓UniNest
            </h1>
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
                onClick={() => navigate("/profile")}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-500  ${
                  (pathMathRoute("/profile") || pathMathRoute("/signin")) &&
                  "border-b-[3px]"
                }`}
              >
                {pageState}
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
