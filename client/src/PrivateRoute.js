import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Context } from "./Context";

const PrivateRoute = ({ children, ...rest }) => {
  const { authenticatedUser: authUser } = useContext(Context);
  const location = useLocation();
  if (!authUser)
    return <Navigate to="/signin" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
