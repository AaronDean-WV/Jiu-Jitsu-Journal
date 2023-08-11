import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { getUserProfileById } from "../APIManagers/UserProfileManager";


export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, [id]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  const beltRankColor = userProfile?.beltRank?.color;
  const beltRankImg = userProfile?.beltRank?.img;

  return (
    <Card className="m-4 text-center">
      <CardBody>
        <div>
          <strong className="userProfile-title">
              <h5>{userProfile?.fullName}</h5>
          </strong>
          <div>
            <strong>Belt Rank:</strong> {beltRankColor}
          </div>
          <div>
          <img
  src={beltRankImg} 
  alt={beltRankColor}
  width="150" 
  height="100" 
/>

          </div>
          <div>
            <strong>Weekly Class Goal:</strong> {userProfile?.weeklyClassGoal}
          </div>
          <div>
            <strong>Weekly Roll Goal:</strong> {userProfile?.weeklyRollGoal}
          </div>
        </div>
        <Button tag={Link} to="/users/:id/edit" className="btn btn-primary">
        Edit Profile
      </Button>
      </CardBody>
    </Card>
  );
};
