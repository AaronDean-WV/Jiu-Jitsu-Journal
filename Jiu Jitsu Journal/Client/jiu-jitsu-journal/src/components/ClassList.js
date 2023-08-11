import React, { useState, useEffect } from "react";
import { getAllClasses } from "../APIManagers/ClassManager";
import { Class } from "./Class";
import { Link } from "react-router-dom";

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  const getClasses = () => {
    getAllClasses().then(allClasses => setClasses(allClasses)); 
  };

  useEffect(() => {
    getClasses();
  }, []); 

  // Sort classes by date
  const sortedClasses = classes.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {sortedClasses.map((bjjClass) => (
            <Class key={bjjClass.id} bjjClass={bjjClass} /> 
          ))}
        </div>
        <div className="add-class-btn">
          <Link to="/classes/add">
            <button className="btn btn-primary">Add Class</button>
          </Link>
          </div>
      </div>
    </div>
  );
};

export default ClassList;
