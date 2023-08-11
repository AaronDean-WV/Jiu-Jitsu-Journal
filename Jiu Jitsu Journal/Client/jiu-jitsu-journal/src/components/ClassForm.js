import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addClass } from "../APIManagers/ClassManager.js"
import { Card, CardBody } from "reactstrap"
import { Form } from "reactstrap"
import DatePicker from "react-datepicker"




export const ClassForm = () => {

   
    const { classId } = useParams();
    const localJournalUser = localStorage.getItem("userProfile")
    const journalUserObject = JSON.parse(localJournalUser)
    const navigate = useNavigate();
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const timezoneOffset = offset * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)
    const [typeOfClass, setTypeOfClass] = useState("");
    const [selectedDate, setSelectedDate] = useState(correctedDate);
    const [rollsCompleted, setRollsCompleted] = useState("");
    const [notes, setNotes] = useState("");


    const [newClass, updateClass] = useState({
        UserProfileId: 1,
        Date: correctedDate.toISOString(),
        Notes: "",
        RollCount: 0,
        TypeOfClass: ""
    })

    const submit = (e) => {
        e.preventDefault()
        updateClass({
            
            Date: correctedDate.toISOString(),
            Notes: notes,
            RollCount: rollsCompleted,
            TypeOfClass: typeOfClass
        })
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const classToSendToAPI = {
            UserProfileId: 1,
            Date: correctedDate.toISOString(),
            Notes: newClass.Notes,
            RollCount: newClass.RollCount,
            TypeOfClass: newClass.TypeOfClass
        }

        console.log("classToSendToAPI", classToSendToAPI)
        addClass(classToSendToAPI)
        .then((classId) => {
            if (classId) {
                navigate("/");
            }
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
                  value={newClass.TypeOfClass}
                  onChange={(e) =>{
                    const copy = { ...newClass }
                    copy.TypeOfClass = e.target.value
                    updateClass(copy)
                }}
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
                  value={newClass.RollCount}
                  onChange={(e) =>{
                    const copy = { ...newClass }
                    copy.RollCount = e.target.value
                    updateClass(copy)
                }}
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
                <Input id="notes" onChange={(e) =>{
                    const copy = { ...newClass }
                    copy.Notes = e.target.value
                    updateClass(copy)
                }} />
              </FormGroup>
            </Form>
            <Button color="info" onClick={handleSaveButtonClick}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
