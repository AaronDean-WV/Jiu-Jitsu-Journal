import React, { useState, useEffect } from "react";
import { getClassByUserId } from "../APIManagers/ClassManager";
import { Link } from "react-router-dom";
import "./ClassList.css";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const localJournalUser = localStorage.getItem("userProfile");
  const journalUserObject = JSON.parse(localJournalUser);

  const getClasses = () => {
    getClassByUserId(journalUserObject.id).then(allClasses => setClasses(allClasses));
  };

  useEffect(() => {
    getClasses();
  }, []);

  // Sort classes by date
  const sortedClasses = classes.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Group classes by month
  const groupedClasses = {};
  sortedClasses.forEach(bjjClass => {
    const monthYear = new Date(bjjClass.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    });
    if (!groupedClasses[monthYear]) {
      groupedClasses[monthYear] = [];
    }
    groupedClasses[monthYear].push(bjjClass);
  });

  // State to track visibility of each month's classes
  const [expandedMonths, setExpandedMonths] = useState({});

  // Toggle the visibility of classes for a specific month
  const toggleMonthVisibility = monthYear => {
    setExpandedMonths(prevState => ({
      ...prevState,
      [monthYear]: !prevState[monthYear]
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Object.keys(groupedClasses).map(monthYear => (
            <div key={monthYear}>
              <button
                className="btn btn-link"
                onClick={() => toggleMonthVisibility(monthYear)}
              >
                {monthYear}
              </button>
              {expandedMonths[monthYear] && (
                <div>
                  {groupedClasses[monthYear].map(bjjClass => (
                    <Link className="button" key={bjjClass.id} to={`/class/${bjjClass.id}`}>
                      <p>{new Date(bjjClass.date).toDateString()}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
