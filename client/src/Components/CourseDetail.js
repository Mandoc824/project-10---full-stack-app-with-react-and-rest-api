import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [materials, setMaterials] = useState([]);
  const [author, setAuthor] = useState({});
  const [description, setDescription] = useState([]);
  const { id } = useParams();

  const { authenticatedUser: authUser } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Course Detail";
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => {
        const course = response.data.course;
        const materialsArr = course.materialsNeeded
          ? course.materialsNeeded.trim().split("*")
          : [];

        const descriptionArr = course.description.split(/\r?\n/);
        const completeMaterials = materialsArr.length
          ? materialsArr.filter((material) => material !== "")
          : [];
        setDescription(descriptionArr);
        setCourse(course);
        setAuthor(course.User);
        setMaterials(completeMaterials);
      })
      .catch((err) => {
        console.log(err);
        navigate("/NotFound");
      });
  }, [id, navigate]);

  const deleteCourse = (event) => {
    axios
      .delete(`http://localhost:5000/api/courses/${id}`, {
        auth: {
          username: authUser.emailAddress,
          password: authUser.password,
        },
      })
      .then(() => {
        navigate("/");
        console.log("Course Deleted Succesfully!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(author);
  return (
    <>
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <Link onClick={deleteCourse} className="button" to="#">
              Delete Course
            </Link>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
      </main>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">course</h3>
              <h4 className="course--name">{course.title}</h4>
              {author ? (
                <p>
                  By {author.firstName} {author.lastName}
                </p>
              ) : (
                <p>"No Author Defined"</p>
              )}

              {description ? (
                description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>No Description available</p>
              )}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              {course.estimatedTime ? (
                <p>{course.estimatedTime}</p>
              ) : (
                <p>No Estimated Time Listed</p>
              )}

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {materials ? (
                  materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))
                ) : (
                  <li>No Materials Listed</li>
                )}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
