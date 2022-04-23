import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <main>
      <div className="wrao">
        <h2>Not Found</h2>
        <p>Sorry! We couldn't find the page you were looking for.</p>
      </div>
    </main>
  );
};

export default NotFound;
