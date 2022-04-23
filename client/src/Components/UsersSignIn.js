import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../Context";

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const {
    actions: { signIn },
  } = useContext(Context);

  const onChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password": {
        setPassword(value);
        break;
      }
      default:
        console.log(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsuccesful"]);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={onChange}
          />

          <button className="button" type="submit">
            Sign In
          </button>

          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignIn;
