import React, { useState } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";

const WeeklyReport = ({ classes, userProfileId }) => {
  // State to keep track of the selected week start date
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(new Date()));
  const selectedWeekEnd = endOfWeek(selectedWeekStart);

  // Function to calculate the weekly reports
  const calculateWeeklyReports = () => {
    const userClasses = classes.filter(bjjClass => bjjClass.userProfileId === userProfileId);

    // Create an object to store the weekly reports
    const weeklyReports = {};

    // Loop through user's classes and calculate the weekly reports
    userClasses.forEach((bjjClass) => {
      const classDate = new Date(bjjClass.selectedDate);

      if (classDate >= selectedWeekStart && classDate <= selectedWeekEnd) {
        const weekStart = startOfWeek(classDate);
        const key = format(weekStart, "yyyy-MM-dd");

        if (!weeklyReports[key]) {
          weeklyReports[key] = {
            startDate: weekStart,
            endDate: endOfWeek(weekStart),
            numberOfClasses: 0,
            numberOfRolls: 0,
            numberOfGiClasses: 0,
            numberOfNoGiClasses: 0,
          };
        }

        weeklyReports[key].numberOfClasses += 1;
        weeklyReports[key].numberOfRolls += bjjClass.rollsCompleted;

        if (bjjClass.typeOfClass === "Gi") {
          weeklyReports[key].numberOfGiClasses += 1;
        } else if (bjjClass.typeOfClass === "No-Gi") {
          weeklyReports[key].numberOfNoGiClasses += 1;
        }
      }
    });

    return Object.values(weeklyReports);
  };

  // Function to navigate to the previous week
  const navigateToPreviousWeek = () => {
    const previousWeekStart = startOfWeek(new Date(selectedWeekStart));
    previousWeekStart.setDate(selectedWeekStart.getDate() - 7);
    setSelectedWeekStart(previousWeekStart);
  };

  // Function to navigate to the next week
  const navigateToNextWeek = () => {
    const nextWeekStart = startOfWeek(new Date(selectedWeekStart));
    nextWeekStart.setDate(selectedWeekStart.getDate() + 7);
    setSelectedWeekStart(nextWeekStart);
  };

  // Calculate the weekly reports
  const weeklyReports = calculateWeeklyReports();

  return (
    <div>
      <h2>Weekly Reports</h2>
      <div>
        <button onClick={navigateToPreviousWeek}>Previous Week</button>
        <span>
          {format(selectedWeekStart, "MMMM d, yyyy")} - {format(selectedWeekEnd, "MMMM d, yyyy")}
        </span>
        <button onClick={navigateToNextWeek}>Next Week</button>
      </div>
      {weeklyReports.map((report) => (
        <div key={report.startDate}>
          <h3>
            {format(report.startDate, "MMMM d")} - {format(report.endDate, "MMMM d")}
          </h3>
          <p>Number of Classes: {report.numberOfClasses}</p>
          <p>Number of Rolls: {report.numberOfRolls}</p>
          <p>Number of Gi Classes Attended: {report.numberOfGiClasses}</p>
          <p>Number of No-Gi Classes Attended: {report.numberOfNoGiClasses}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyReport;
