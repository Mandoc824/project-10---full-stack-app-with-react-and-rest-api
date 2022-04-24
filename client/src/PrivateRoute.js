import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "./Context";

const PrivateRoute = ({ children, ...rest }) => {
  const { authenticatedUser: authUser } = useContext(Context);
  if (!authUser) return <Navigate to="/signin" replace />;

  return children;
};

export default PrivateRoute;
