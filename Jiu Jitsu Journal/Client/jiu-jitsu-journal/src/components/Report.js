import React, { useState } from "react";
import MonthlyReport from "./MonthlyReport";
import WeeklyReport from "./WeeklyReport.Js";



export const ReportsPage = ({ classes, userProfileId }) => {
  const [reportType, setReportType] = useState("monthly"); // Default to monthly report
  const localJournalUser = localStorage.getItem("userProfile")
  const journalUserObject = JSON.parse(localJournalUser)

  return (
    <div>
      <h1>Reports</h1>
      <div>
        <button onClick={() => setReportType("monthly")}>Monthly Report</button>
        <button onClick={() => setReportType("weekly")}>Weekly Report</button>
      </div>
      {reportType === "monthly" ? (
        <MonthlyReport classes={classes} userProfileId={journalUserObject.id} />
      ) : (
        <WeeklyReport classes={classes} userProfileId={journalUserObject.id} />
      )}
    </div>
  );
};

export default ReportsPage;
