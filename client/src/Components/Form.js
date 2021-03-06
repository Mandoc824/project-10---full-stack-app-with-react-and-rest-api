import React from "react";
import { Link } from "react-router-dom";
const Form = (props) => {
  const {
    errors,
    onChange,
    pageTitle,
    description,
    estimatedTime,
    materials,
    title,
    author,
    courseId,
    onSubmit,
    authUserName,
  } = props;
  return (
    <main>
      <div className="wrap">
        <h2>{pageTitle}</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={onSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                onInput={onChange}
                defaultValue={title ? title : ""}
              />

              <p>
                {author
                  ? `By ${author.firstName} ${author.lastName}`
                  : `By ${authUserName}`}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onInput={onChange}
                defaultValue={description ? description : ""}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                htmlFor="estimatedTime"
                name="estimatedTime"
                type="text"
                onInput={onChange}
                defaultValue={estimatedTime ? estimatedTime : ""}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onInput={onChange}
                defaultValue={materials ? materials : ""}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            {pageTitle}
          </button>
          <Link
            className="button button-secondary"
            to={courseId ? `/courses/${courseId}` : "/"}
          >
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Form;
