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
        Id: classId,
        UserProfileId: journalUserObject.id,
        Notes: "",
        TypeOfClass: "",
        Date: correctedDate.toISOString(),
        RollCount: 0
    })

    const submit = (e) => {
        e.preventDefault()
        updateClass({
            Id: classId,
            UserProfileId: journalUserObject.id,
            Notes: notes,
            TypeOfClass: typeOfClass,
            Date: correctedDate.toISOString(),
            RollCount: rollsCompleted
        })
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const classToSendToAPI = {
            Id: classId,
            UserProfileId: journalUserObject.id,
            Notes: newClass.notes,
            TypeOfClass: newClass.typeOfClass,
            Date: correctedDate.toISOString(),
            RollCount: newClass.rollCount
        }

        console.log(classId)
        addClass(classToSendToAPI)
        .then(() => {
            if (classId) {
                navigate(`/class/${classId}`);
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
