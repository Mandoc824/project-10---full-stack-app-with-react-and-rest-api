import React, { useState, useContext } from "react";
import axios from "axios";

import { Context } from "../Context";

import Form from "./Form";

const CreateCourse = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const { authenticatedUser: authUser } = useContext(Context);
  const pageTitle = "Create Course";

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
      .post(
        "http://localhost:5000/api/courses",
        {},
        {
          auth: {
            username: authUser.emailAddress,
            password: authUser.password,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(authUser);
      });
  };
  console.log(description);
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        onChange={onChange}
        errors={errors}
        pageTitle={pageTitle}
      />
    </>
  );
};

export default CreateCourse;
