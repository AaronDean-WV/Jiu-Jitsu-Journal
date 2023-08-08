import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Class = ({ bjjClass }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {bjjClass.userProfile.fullName}</p>
      {/* <CardImg top src={bjjClass.imageUrl} alt={bjjClass.title} /> */}
      <CardBody>
        <p>
          <Link to={`/class/${bjjClass.id}`}>
          <strong>{bjjClass.date}</strong>
          </Link>
        </p>
        <p>{bjjClass.note}</p>
      </CardBody>
    </Card>
  );
};