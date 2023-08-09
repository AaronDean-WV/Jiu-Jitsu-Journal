import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Class = ({ bjjClass }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>Date: </strong>
          <Link to={`/class/${bjjClass.id}`}>
            {new Date(bjjClass.date).toLocaleDateString()}
          </Link>
        </p>
        <p>
          <strong>Notes: </strong>
          {bjjClass.notes}
        </p>
        <p>
          <strong>Type of Class: </strong>
          {bjjClass.typeOfClass}
        </p>
        <p>
          <strong>Posted by: </strong>
          {bjjClass.userProfile.fullName}
        </p>
        <p>
          <strong>Roll Count: </strong>
          {bjjClass.rollCount}
        </p>
      </CardBody>
    </Card>
  );
};
