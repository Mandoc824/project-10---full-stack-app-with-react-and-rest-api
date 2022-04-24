import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import CreateCourse from "./Components/CreateCourse";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UpdateCourse from "./Components/UpdateCourse";
import Header from "./Components/Header";
import UserSignUp from "./Components/UserSignUp";
import UserSignIn from "./Components/UsersSignIn";
import UserSignOut from "./Components/UserSignOut";

//private route
import PrivateRoute from "./PrivateRoute";

//extra components
import UnhandledError from "./Components/UnhandledError";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/courses/:id/update"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/create"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
