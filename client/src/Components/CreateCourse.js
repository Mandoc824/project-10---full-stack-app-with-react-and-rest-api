import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Context } from "../Context";

import Form from "./Form";

const CreateCourse = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState();
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const { authenticatedUser: authUser } = useContext(Context);
  const pageTitle = "Create Course";
  const author = authUser ? `${authUser.firstName} ${authUser.lastName}` : null;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Course";
  }, []);

  const onChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "courseTitle":
        setTitle(value);
        break;
      case "courseDescription":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        console.log(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const course = {
      title,
      estimatedTime,
      description,
      materialsNeeded,
    };

    axios
      .post("http://localhost:5000/api/courses", course, {
        auth: {
          username: authUser.emailAddress,
          password: authUser.password,
        },
      })
      .then(() => {
        navigate("/");
        console.log("Course Created Succesfully");
      })
      .catch((err) => {
        if (err.response && err.response.status !== 500) {
          if (err.response.status === 400) {
            const {
              response: {
                data: { errors },
              },
            } = err;
            console.log(errors);
            setErrors(errors);
          }
        } else {
          navigate("/error");
        }
        console.log(err.response);
      });
  };
  console.log(description);
  return (
    <>
      <Form
        authUserName={author}
        onSubmit={handleSubmit}
        onChange={onChange}
        errors={errors}
        pageTitle={pageTitle}
      />
    </>
  );
};

export default CreateCourse;
