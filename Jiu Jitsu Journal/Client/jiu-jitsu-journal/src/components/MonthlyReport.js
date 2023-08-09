import React, { useState } from "react";

const MonthlyReport = ({ classes, userProfileId }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const calculateMonthlyReports = () => {
    const userClasses = classes.filter(bjjClass => bjjClass.userProfileId === userProfileId);

    // Create an object to store the monthly reports
    const monthlyReports = {};

    // Loop through all of the user's classes and calculate the monthly reports
    userClasses.forEach((bjjClass) => {
      const classDate = new Date(bjjClass.selectedDate);
      const year = classDate.getFullYear();
      const month = classDate.getMonth() + 1; // Adding 1 since months are 0-indexed
      const key = `${year}-${month}`;

      // If the monthly report doesn't exist yet, create it
      if (!monthlyReports[key]) {
        monthlyReports[key] = {
          year,
          month,
          numberOfClasses: 0,
          numberOfRolls: 0,
          numberOfGiClasses: 0,
          numberOfNoGiClasses: 0,
        };
      }

      // Update the monthly report
      monthlyReports[key].numberOfClasses += 1;
      monthlyReports[key].numberOfRolls += bjjClass.rollsCompleted;

      // Check if the class was a Gi or No-Gi class and update the monthly report
      if (bjjClass.typeOfClass === "Gi") {
        monthlyReports[key].numberOfGiClasses += 1;
      } else if (bjjClass.typeOfClass === "No-Gi") {
        monthlyReports[key].numberOfNoGiClasses += 1;
      }
    });

    return Object.values(monthlyReports);
  };

  // Function to navigate to the previous month
  const navigateToPreviousMonth = () => {
    const previousMonth = new Date(selectedMonth);
    previousMonth.setMonth(selectedMonth.getMonth() - 1);
    setSelectedMonth(previousMonth);
  };
 // Function to navigate to the next month
  const navigateToNextMonth = () => {
    const nextMonth = new Date(selectedMonth);
    nextMonth.setMonth(selectedMonth.getMonth() + 1);
    setSelectedMonth(nextMonth);
  };

  // Calculate the monthly reports
  const reports = calculateMonthlyReports();

  return (
    <div>
      <h2>Monthly Reports</h2>
      <div>
        <button onClick={navigateToPreviousMonth}>Previous Month</button>
        <span>{selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
        <button onClick={navigateToNextMonth}>Next Month</button>
      </div>
      {reports.map((report) => (
        <div key={`${report.year}-${report.month}`}>
          <h3>{`${report.month}/${report.year}`}</h3>
          <p>Number of Classes: {report.numberOfClasses}</p>
          <p>Number of Rolls: {report.numberOfRolls}</p>
          <p>Number of Gi Classes Attended: {report.numberOfGiClasses}</p>
          <p>Number of No-Gi Classes Attended: {report.numberOfNoGiClasses}</p>
        </div>
      ))}
    </div>
  );
};

export default MonthlyReport;
