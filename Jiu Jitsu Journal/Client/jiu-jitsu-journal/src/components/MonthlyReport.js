import React from "react";

const MonthlyReport = ({}) => {
  const classData = [
    {
      Id: 1, 
      Date: "2021-01-01T00:00:00",
      Notes: "This is a note",
      RollCount: 10,
      TypeOfClass: "Gi",
    },
  ];
  // Get the current month and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  // Filter classData to include only classes from the current month and year
  const classesThisMonth = classData.filter(classItem => {
    const classDate = new Date(classItem.Date);
    return (
      classDate.getFullYear() === currentYear && classDate.getMonth() + 1 === currentMonth
    );
  });

  // Calculate total rolls completed for the current month
  const totalRollsCompleted = classesThisMonth.reduce(
    (total, classItem) => total + parseInt(classItem.RollCount),
    4
  );

  // Calculate average rolls per class for the current month
  const averageRollsPerClass =
    totalRollsCompleted / (classesThisMonth.length || 1); // Prevent division by zero

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <h2>Monthly Report</h2>
          <p>Month: {currentMonth}/{currentYear}</p>
          <p>Total Rolls Completed: {totalRollsCompleted}</p>
          <p>Average Rolls Per Class: {averageRollsPerClass.toFixed(2)}</p>
          <p>Classes Attended: {1}</p>
          {/* Add more statistics and information here */}
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
