import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";

import Form from "./Form";

const UpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [course, setCourse] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const [author, setAuthor] = useState({});
  const [description, setDescription] = useState([]);
  const { id } = useParams();

  const { authenticatedUser: authUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Course";
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {
        const course = response.data.course;
        const materials = course.materialsNeeded ? course.materialsNeeded : "";
        const title = course.title;
        const description = course.description;
        const estimatedTime = course.estimatedTime ? course.estimatedTime : "";

        setDescription(description);
        setCourse(course);
        setAuthor(course.User);
        setMaterialsNeeded(materials);
        setTitle(title);
        setEstimatedTime(estimatedTime);
      })
      .catch((err) => {
        console.log(err);
        setCourse(null);
        navigate("/NotFound");
      });
  }, [id, navigate]);

  const pageTitle = "Update Course";
  const courseId = course ? course.id : null;

  const onChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "title":
        setTitle(value);
        break;
      case "description":
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
    console.log(title);
    const updatedCourse = {
      id,
      title,
      estimatedTime,
      materialsNeeded,
      description,
    };

    axios
      .put(`http://localhost:5000/api/courses/${id}`, updatedCourse, {
        auth: {
          username: authUser.emailAddress,
          password: authUser.password,
        },
      })
      .then((response) => {
        navigate(`/courses/${id}`);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Form
        onChange={onChange}
        onSubmit={handleSubmit}
        description={description}
        estimatedTime={estimatedTime}
        materials={materialsNeeded}
        title={title}
        pageTitle={pageTitle}
        author={author}
        courseId={courseId}
      />
    </>
  );
};

export default UpdateCourse;
