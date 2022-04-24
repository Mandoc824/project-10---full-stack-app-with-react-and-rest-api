import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const {
    actions: { signIn },
  } = useContext(Context);

  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  const onChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    axios
      .post("http://localhost:5000/api/users", user)
      .then(() => {
        signIn(emailAddress, password).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        if (err.response && err.response.status !== 500) {
          console.log(err.response.data.errors);
          if (err.response.status === 400) {
            const {
              response: {
                data: { errors },
              },
            } = err;
            setErrors(errors);
          }
        } else {
          navigate("/error");
        }
      });
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            onInput={onChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            onInput={onChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            onInput={onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            onInput={onChange}
          />
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
