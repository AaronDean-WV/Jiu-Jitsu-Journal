import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const UserProfile = ({
  userProfileProp,
  handleDeactivateUser
}) => {
  const confirmDeactivate = () => {
    const confirmation = window.confirm("Are you sure you want to deactivate this user?");
    if (confirmation) {
      handleDeactivateUser(userProfileProp.id);
    }
  };

  return (
    <Card className="m-4 text-center">
      <CardBody>
        <div>
          <strong className="userProfile-title">
            <Link to={`/userprofiles/${userProfileProp.id}`}>
              <h5>{userProfileProp.fullName}</h5>
            </Link>
          </strong>
          <div>
            <strong>Belt Rank:</strong> {userProfileProp.beltRank}
          </div>
          <div>
            <img
              src={userProfileProp.img} 
              alt={userProfileProp.beltRank}
              width="50" 
              height="50" 
            />
          </div>
          <div>
            <strong>Weekly Class Goal:</strong> {userProfileProp.weeklyClassGoal}
          </div>
          <div>
            <strong>Weekly Roll Goal:</strong> {userProfileProp.weeklyRollGoal}
          </div>
          <Button
            color="danger"
            className="mb-2"
            onClick={confirmDeactivate}
          >
            Deactivate
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
