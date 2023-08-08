import React, { useState, useEffect } from "react";
import { getAllClasses } from "../APIManagers/ClassManager";
import { Class } from "./Class";

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  const getClasses = () => {
    getAllClasses().then(allClasses => setClasses(allClasses)); 
  };

  useEffect(() => {
    getClasses();
  }, []); 



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {classes.map((bjjClass) => (
            <Class key={bjjClass.id} post={bjjClass} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassList;