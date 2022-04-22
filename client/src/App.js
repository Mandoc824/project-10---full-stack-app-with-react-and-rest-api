import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Header from "./Components/Header";
import CreateCourse from "./Components/CreateCourse";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/create" element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
