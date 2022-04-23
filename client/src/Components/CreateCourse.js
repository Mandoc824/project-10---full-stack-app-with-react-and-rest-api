import React, { useState } from "react";
import axios from "axios";

import Form from "./Form";

const CreateCourse = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

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

  console.log(description);
  return (
    <>
      <Form onChange={onChange} errors={errors} pageTitle={pageTitle} />
    </>
  );
};

export default CreateCourse;
