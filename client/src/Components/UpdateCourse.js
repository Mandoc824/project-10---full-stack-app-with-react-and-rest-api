import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "./Form";

const UpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [author, setAuthor] = useState({});
  const [description, setDescription] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
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
        setMaterials(materials);
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
  return (
    <>
      <Form
        description={description}
        estimatedTime={estimatedTime}
        materials={materials}
        title={title}
        pageTitle={pageTitle}
        author={author}
        courseId={courseId}
      />
    </>
  );
};

export default UpdateCourse;
