import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const {
    actions: { signUp },
  } = useContext(Context);

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button className="button" type="submit">
            Sign Up
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignUp;
