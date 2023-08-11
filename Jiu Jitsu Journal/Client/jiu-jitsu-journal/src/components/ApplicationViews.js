import { Routes, Route, Navigate } from "react-router-dom";
import ClassList from "./ClassList";
import { ClassForm } from "./ClassForm";
import { UserProfile } from "./UserProfile";
import MonthlyReport from "./MonthlyReport";
import { UserProfileEdit } from "./EditUserProfile";
import ReportsPage from "./Report";
import WeeklyReport from "./WeeklyReport.Js";
import { Class } from "./Class";
import Login from "./Login";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/classlist" element={<ClassList />} />
      <Route path="/class/:classId" element={<Class />} />
      <Route path="/classes/add" element={<ClassForm />} />
      <Route path="/userprofile/:id" element={<UserProfile />} />
      <Route path="/userprofile/edit/:id" element={<UserProfileEdit />} />
      <Route path="/" element={<MonthlyReport />} />
      <Route path="/report/weekly-report/:id" element={<WeeklyReport />} />
      <Route path="/report" element={<ReportsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
};

export default ApplicationViews;
