import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Container } from "reactstrap";
import { getById } from "../APIManagers/ClassManager";

export const ClassDetails = () => { 
    const [bjjClass, setClass] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getById(id)
        .then((data) => 
        {setClass(data);
        })
        .catch((error) => {
            console.log("Error fetching user class:", error);
        });
    }, [id]);
    
    return (
        <Container>
          <Card className="my-4">
            <CardBody>
              <CardTitle tag="h3">Class Details</CardTitle>
              <CardSubtitle tag="h5" className="mb-2 text-muted">
                Date: {new Date(bjjClass.date).toLocaleDateString()}
              </CardSubtitle>
              <p>
                <strong>Notes: </strong>
                {bjjClass.notes}
              </p>
              <p>
                <strong>Type of Class: </strong>
                {bjjClass.typeOfClass}
              </p>
              <p>
                <strong>Roll Count: </strong>
                {bjjClass.rollCount}
              </p>
            </CardBody>
          </Card>
        </Container>
      );
    };      