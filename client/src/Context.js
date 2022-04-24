import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const Context = createContext();

export const Provider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );

  useEffect(() => {
    if (cookie) {
      setAuthenticatedUser(JSON.parse(cookie));
    }
  }, [cookie]);

  const signIn = async (username, password) => {
    const response = await axios.get("http://localhost:5000/api/users", {
      auth: {
        username,
        password,
      },
    });

    if (response.data.User) {
      const user = response.data.User;
      user.password = password;
      setAuthenticatedUser(user);
      Cookies.set("authenticatedUser", JSON.stringify(user), {
        expires: 1,
      });
    }

    return response;
  };

  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
  };

  const value = {
    authenticatedUser,
    actions: {
      signIn,
      signOut,
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
