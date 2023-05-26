import React, { useEffect } from "react";
import { Table } from "./index";
import { fetchUser } from "../utils/fetchUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl my-10">Welcome to Admin Panel</h1>
      <Table />
    </div>
  );
};

export default Home;
