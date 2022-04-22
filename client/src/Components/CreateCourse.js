import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const [errors, setErrors] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "courseTitle":
        setCourseTitle(value);
        break;
      case "courseDescription":
        setCourseDescription(value);
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

  console.log("course title: " + courseTitle);
  console.log("course description: " + courseDescription);
  console.log("estimated time: " + estimatedTime);
  console.log("materials needed: " + materialsNeeded);

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                onChange={onChange}
              />

              <p>Author</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={onChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                htmlFor="estimatedTime"
                name="estimatedTime"
                type="text"
                onChange={onChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
