import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../Context";

const Header = () => {
  const { authenticatedUser: authUser } = useContext(Context);

  console.log(authUser);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/">Courses</NavLink>
        </h1>
        <nav>
          {authUser ? (
            <ul className="header--signedin">
              <li>{`Welcome ${authUser.firstName} ${authUser.lastName}!`}</li>
              <li>
                <NavLink to="/signout">Sign Out</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
