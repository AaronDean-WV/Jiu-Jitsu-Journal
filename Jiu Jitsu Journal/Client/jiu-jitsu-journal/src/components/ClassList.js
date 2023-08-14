import React, { useState, useEffect } from "react";
import { getAllClasses } from "../APIManagers/ClassManager";
import { Class } from "./Class";
import { Link } from "react-router-dom";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const getClasses = () => {
    getAllClasses().then(allClasses => setClasses(allClasses)); 
  };

  useEffect(() => {
    getClasses();
  }, []); 

  // Sort classes by date
  const sortedClasses = classes.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Group classes by month
  const groupedClasses = sortedClasses.reduce((acc, bjjClass) => {
    const date = new Date(bjjClass.date);
    const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(bjjClass);
    return acc;
  }, {});

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {selectedMonth ? (
            <div>
              <button onClick={() => setSelectedMonth(null)}>Back to all classes</button>
              {groupedClasses[selectedMonth].map((bjjClass) => (
                <Link key={bjjClass.id} to={`/class/${bjjClass.id}`}>
                  <p>{new Date(bjjClass.date).toDateString()}</p>
                </Link>
              ))}
            </div>
          ) : (
            Object.keys(groupedClasses).map((month) => (
              <button key={month} onClick={() => handleMonthClick(month)}>
                {month}
              </button>
            ))
          )}
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
