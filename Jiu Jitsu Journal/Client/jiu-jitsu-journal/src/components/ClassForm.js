import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { addClass } from "../APIManagers/ClassManager";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { ClassContext } from "../APIManagers/ClassManager";
import { UserProfileContext } from "../APIManagers/UserProfileManager";

export const ClassForm = () => {
  const { addClass } = useContext(ClassContext);
  const { userProfileId } = useContext(UserProfileContext);
  const [typeOfClass, setTypeOfClass] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
    const [rollsCompleted, setRollsCompleted] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    const bjjClass = {
      typeOfClass,
      notes,
      selectedDate,
      userProfileId: userProfileId.id,
    };

    addClass(bjjClass).then((c) => {
      // Navigate the user back to the home route
      navigate("/");
    });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="typeOfClass">What type of class was it?</Label>
                <select
                  id="typeOfClass"
                  value={typeOfClass}
                  onChange={(e) => setTypeOfClass(e.target.value)}
                >
                  <option value="">Select type of class</option>
                  <option value="Gi">Gi</option>
                  <option value="No-Gi">No-Gi</option>
                </select>
              </FormGroup>
              <FormGroup>
              <Label for="date">Date</Label>
                <DatePicker
                  id="date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </FormGroup>
              <FormGroup>
                <Label for="rollsCompleted">Number of Rolls Completed</Label>
                <select
                  id="rollsCompleted"
                  value={rollsCompleted}
                  onChange={(e) => setRollsCompleted(e.target.value)}
                >
                  <option value="">Select rolls completed</option>
                  {Array.from({ length: 15 }, (_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="notes">Notes about class.</Label>
                <Input id="notes" onChange={(e) => setNotes(e.target.value)} />
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
