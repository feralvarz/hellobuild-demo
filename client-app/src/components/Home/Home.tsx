import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = (props) => {
  return (
    <>
      <h2>Home Component</h2>
      <p>
        <Link to="/login">Login to start</Link>
      </p>
      <p>
        Don't you have an account? <Link to="/signup">Signup here</Link>
      </p>
    </>
  );
};
