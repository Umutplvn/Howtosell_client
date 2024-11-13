import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DbMain from "./DbMain";

const PrivateRouter = () => {
  const { userId } = useSelector((state) => state.auth);

  return <div>{userId ? <Outlet /> : <DbMain />}</div>;
};

export default PrivateRouter;
