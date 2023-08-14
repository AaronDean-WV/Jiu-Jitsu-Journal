import React, { useState, useEffect } from "react";
import { getAllClasses, getClassByUserId } from "../APIManagers/ClassManager";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; 
import { Class } from "./Class";
import { Link } from "react-router-dom";

const MonthlyReport = () => {
  const [classes, setClasses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const localJournalUser = localStorage.getItem("userProfile");
  const journalUserObject = JSON.parse(localJournalUser);

  const getClasses = () => {
    getClassByUserId(journalUserObject.id).then(allClasses => setClasses(allClasses)); 
  };

  useEffect(() => {
    getClasses();
  }, []); // Add selectedMonth as a dependency
  
  // Filter classes by selected month
  const filteredClasses = classes.filter(bjjClass => {
    const classDate = new Date(bjjClass.date);
    return (
      classDate.getFullYear() === selectedMonth.getFullYear() &&
      classDate.getMonth() === selectedMonth.getMonth()
    );
  });
  // Sort filtered classes by date
  const sortedClasses = filteredClasses.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate the number of gi and no gi classes attended
  const giClasses = sortedClasses.filter(bjjClass => bjjClass.typeOfClass === "Gi");
  const noGiClasses = sortedClasses.filter(bjjClass => bjjClass.typeOfClass === "No-Gi");

  // Calculate total number of classes attended
  const totalClassesAttended = sortedClasses.length;

  // Calculate average daily rolls
  const totalRolls = sortedClasses.reduce((sum, bjjClass) => sum + bjjClass.rollCount, 0);
  const averageDailyRolls = totalRolls / sortedClasses.length || 0;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
        <div className="month-selector">
          <label htmlFor="month">Select Month:</label>
          <DatePicker
            id="month"
            selected={selectedMonth}
            onChange={date => setSelectedMonth(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
          />
        </div>

          <p>Number of Gi Classes Attended: {giClasses.length}</p>
          <p>Number of No Gi Classes Attended: {noGiClasses.length}</p>
          <p>Total Number of Classes Attended: {totalClassesAttended}</p>
          <p>Average Daily Rolls: {averageDailyRolls.toFixed(2)}</p>
          <h3>Dates Attended</h3>
          {sortedClasses.map((bjjClass) => (
            <p key={bjjClass.id}>{new Date(bjjClass.date).toDateString()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
