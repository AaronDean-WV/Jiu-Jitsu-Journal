import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import {  register } from "../APIManagers/UserProfileManager";


export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const localJournalUser = localStorage.getItem("userProfile")
  const user = JSON.parse(localJournalUser)
  const [fullName, setFullName] = useState( "");
  const [email, setEmail] = useState( "");
  const [weeklyClassGoal, setWeeklyClassGoal] = useState(0);
  const [weeklyRollGoal, setWeeklyRollGoal] = useState(0);
  const [beltRank, setBeltRank] = useState(); // Set default to "White"

  //setting up a map to convert the belt rank to the id in the database
  const beltRankIdMap = {
    White: 1,
    Blue: 2,
    Purple: 3,
    Brown: 4,
    Black: 5
  };

  const handleWeeklyClassGoalChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue < 22) {
      setWeeklyClassGoal(newValue);
    }
  };

  const handleWeeklyRollGoalChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue < 151) {
      setWeeklyRollGoal(newValue);
    }
  };

  const handleBeltRankChange = (e) => {
    const selectedBeltRank = e.target.value;
    setBeltRank(selectedBeltRank);
  };

  const registerClick = (e) => {
    e.preventDefault();

    const userProfile = {
      fullName,
      email,
      weeklyClassGoal,
      weeklyRollGoal,
      beltRankId: beltRankIdMap[beltRank] || 1 // Default to 1 if not found
    };

    register(userProfile)
    .then(() => {
      setIsLoggedIn(true);
      localStorage.setItem("userProfile", JSON.stringify(userProfile)); // Set user profile data
      navigate('/');
    });
  
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="weeklyClassGoal">Weekly Class Goal (Max 21)</Label>
          <Input
            id="weeklyClassGoal"
            type="number"
            onChange={handleWeeklyClassGoalChange}
            value={weeklyClassGoal}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="weeklyRollGoal">Weekly Roll Goal (Max 150)</Label>
          <Input
            id="weeklyRollGoal"
            type="number"
            onChange={handleWeeklyRollGoalChange}
            value={weeklyRollGoal}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="beltRank">Belt Rank</Label>
          <select
            id="beltRank"
            value={beltRank}
            onChange={handleBeltRankChange}
          >
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
