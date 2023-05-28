import React, { useEffect } from "react";
import { Table } from "./index";
import { fetchUser } from "../utils/fetchUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login")
  };
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");    
  }, []);

  return (
    <div>
      <div className="w-full flex items-center ">
        <h1 className="text-center text-3xl my-10 w-5/6">
          Welcome to Admin Panel
        </h1>
        <button
          className="bg-red-600 px-6 py-2 rounded-lg text-white"
          onClick={logoutHandler}
        >
          Log out
        </button>
      </div>
      <Table />
    </div>
  );
};

export default Home;
