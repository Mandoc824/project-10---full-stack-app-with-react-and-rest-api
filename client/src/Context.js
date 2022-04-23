import React, { useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import UserData from "./UserData";
export const Context = createContext();

export const Provider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authenticateUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );

  const data = new UserData();
  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      setAuthenticatedUser(user);
      console.log(user);
      Cookies.set("authenticatedUser", JSON.stringify(user), {
        expires: 1,
      });
    }
    console.log(user);
    return user;
  };

  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
  };
  const value = {
    authenticateUser,
    actions: {
      signIn,
      signOut,
    },
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
