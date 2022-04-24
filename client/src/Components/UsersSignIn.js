import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Context } from "../Context";

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const {
    actions: { signIn },
  } = useContext(Context);

  useEffect(() => {
    document.title = "Sign In";
  }, []);
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
      .then((response) => {
        if (response.data.User) {
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status !== 500) {
          if (err.response.status === 401) {
            const errMessage = "Sign-In was unsuccessful";
            if (emailAddress && password) {
              setErrors((prev) => {
                if (!prev.includes(errMessage)) return [...prev, errMessage];
                else return [...prev];
              });
            } else {
              setErrors((prev) => {
                return prev.filter((err) => err !== errMessage);
              });
            }
          }
        } else {
          navigate("/error");
        }
      });

    if (emailAddress === "") {
      const missingEmailMessage = "Please provide a value for email";
      setErrors((prev) => {
        if (!prev.includes(missingEmailMessage))
          return [...prev, missingEmailMessage];
        else return [...prev];
      });
    } else {
      setErrors((prev) => {
        const missingEmailMessage = "Please provide a value for email";
        if (prev.includes(missingEmailMessage))
          return prev.filter((err) => err !== missingEmailMessage);
        else return [...prev];
      });
    }

    if (password === "") {
      const missingPasswordMessage = "Please provide a value for password";
      setErrors((prev) => {
        if (!prev.includes(missingPasswordMessage))
          return [...prev, missingPasswordMessage];
        else return [...prev];
      });
    } else {
      setErrors((prev) => {
        const missingPasswordMessage = "Please provide a value for password";
        if (prev.includes(missingPasswordMessage))
          return prev.filter((err) => err !== missingPasswordMessage);
        else return [...prev];
      });
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Sign In Error</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onInput={onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onInput={onChange}
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
