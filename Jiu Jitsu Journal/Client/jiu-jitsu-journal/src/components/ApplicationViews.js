import { Routes, Route, Navigate} from "react-router-dom";
import ClassList from "./ClassList";
import { ClassForm } from "./ClassForm";
import { UserProfile } from "./UserProfile";
import MonthlyReport from "./MonthlyReport";
import { UserProfileEdit } from "./EditUserProfile";


const ApplicationViews = () => {

return (
     <Routes>
     
        <Route path="/" element= {<ClassList />} />
        <Route path="/classes/add" element={<ClassForm />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/users/:id/edit" element={<UserProfileEdit />} />
        <Route path="/report/:id" element={<MonthlyReport />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
     
     </Routes>
    
    )
  

};

export default ApplicationViews;
