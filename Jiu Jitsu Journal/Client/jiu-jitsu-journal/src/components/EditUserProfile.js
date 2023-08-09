import React, { useState, useEffect } from "react";
import {
  editUserProfile,
  getUserProfileById,
  deleteUserProfile,
} from "../../Managers/UserProfileManager";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardTitle,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useParams } from "react-router-dom";

export const UserProfileEdit = ({
  userProfileProp,
  setUserProfile,
  setShowEdit,
}) => {
  const [editedUserProfile, setEditedUserProfile] = useState({ ...userProfileProp });

  const handleSaveButtonClick = async () => {
    try {
      await editUserProfile(editedUserProfile);
      const updatedProfile = await getUserProfileById(userProfileProp.id);
      setUserProfile(updatedProfile);
      setShowEdit(false);
    } catch (error) {
      console.error("Error editing user profile: ", error);
    }
  };
  const handleDeleteButtonClick = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (confirmed) {
      try {
        await deleteUserProfile(userProfileProp.id);
        // Handle the deletion process or user feedback as needed
      } catch (error) {
        console.error("Error deleting user profile: ", error);
      }
    }
  };

  // Handle controlled input changes to the form
  const handleFieldChange = (fieldName, value) => {
    setEditedUserProfile({
      ...editedUserProfile,
      [fieldName]: value,
    });
  };

  // Generate an array of <option> elements for a given range of numbers
  const generateNumberOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  // Map belt rank names to their corresponding ids
  const beltRankIdMap = {
    White: 1,
    Blue: 2,
    Purple: 3,
    Brown: 4,
    Black: 5,
  };

  return (
    <>
      <CardBody>
        <FormGroup className="form-group">
          <Label htmlFor="fullName">Full Name:</Label>
          <Input
            className="userProfile-input"
            type="text"
            id="fullName"
            value={editedUserProfile.fullName}
            onChange={(e) => handleFieldChange("fullName", e.target.value)}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label htmlFor="email">Email:</Label>
          <Input
            className="userProfile-input"
            type="email"
            id="email"
            value={editedUserProfile.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label htmlFor="weeklyClassGoal">Weekly Class Goal:</Label>
          <select
            className="userProfile-input"
            id="weeklyClassGoal"
            value={editedUserProfile.weeklyClassGoal}
            onChange={(e) =>
              handleFieldChange("weeklyClassGoal", parseInt(e.target.value))
            }
          >
            {generateNumberOptions(0, 21)}
          </select>
        </FormGroup>
        <FormGroup className="form-group">
          <Label htmlFor="weeklyRollGoal">Weekly Roll Goal:</Label>
          <select
            className="userProfile-input"
            id="weeklyRollGoal"
            value={editedUserProfile.weeklyRollGoal}
            onChange={(e) =>
              handleFieldChange("weeklyRollGoal", parseInt(e.target.value))
            }
          >
            {generateNumberOptions(0, 150)}
          </select>
        </FormGroup>
        <FormGroup className="form-group">
          <Label htmlFor="beltRankId">Belt Rank:</Label>
          <select
            className="userProfile-input"
            id="beltRankId"
            value={editedUserProfile.beltRankId}
            onChange={(e) =>
              handleFieldChange("beltRankId", parseInt(e.target.value))
            }
          >
            <option value={beltRankIdMap.White}>White</option>
            <option value={beltRankIdMap.Blue}>Blue</option>
            <option value={beltRankIdMap.Purple}>Purple</option>
            <option value={beltRankIdMap.Brown}>Brown</option>
            <option value={beltRankIdMap.Black}>Black</option>
          </select>
        </FormGroup>
        <FormGroup className="form-group">
          <Button
            onClick={handleDeleteButtonClick}
            className="btn btn-danger"
          >
            Delete Profile
          </Button>
          <Button
            onClick={handleSaveButtonClick}
            className="btn btn-primary"
          >
            Save Changes
          </Button>
        </FormGroup>
      </CardBody>
    </>
  );
};
