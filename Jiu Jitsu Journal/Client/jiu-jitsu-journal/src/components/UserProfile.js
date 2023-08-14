import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { deleteProfile, getUserProfileById } from "../APIManagers/UserProfileManager";


export const UserProfile = () => {
  const localJournalUser = localStorage.getItem("userProfile")
  const user = JSON.parse(localJournalUser)
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, [id]);

   const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete === true) {
      deleteProfile(id)
      .then(() => {
        navigate("/login");
      });
    }
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="m-4 text-center">
      <CardBody>
        <div>
          <strong className="userProfile-title">
              <h5>{userProfile?.fullName}</h5>
          </strong>
          <div>
            <strong>Weekly Class Goal:</strong> {userProfile?.weeklyClassGoal}
          </div>
          <div>
            <strong>Daily Roll Goal:</strong> {userProfile?.weeklyRollGoal}
          </div>
        </div>
        <Button  className="btn btn-primary" onClick={() => navigate(`/userprofile/edit/${user?.id}`)}>
        Edit Profile
      </Button>
      <Button onClick={handleDeleteButtonClick} className="btn btn-primary">
        Delete Profile
      </Button>
      </CardBody>
    </Card>
  );
};
