import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../APIManagers/UserProfileManager";


export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  


  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email })
      .then((user) => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}