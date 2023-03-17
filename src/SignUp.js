import React from "react";
import { useState } from "react";
import { Form, FormGroup, Col, Input, Label, Button, Alert } from "reactstrap";
import "./forms.css";

function SignUp(props) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);

  /** Update formData */
  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  /** Call addUser with formData */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp(formData);
  };

  return (
    <div>
      <h4>Sign Up</h4>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <Form style={{ margin: "1em" }} onSubmit={handleSubmit}>
          <Col>
            <FormGroup floating>
              <Input
                id="username"
                name="username"
                placeholder="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Label htmlFor="username">Username</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Label htmlFor="password">Password</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="firstName"
                name="firstName"
                placeholder="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Label htmlFor="firstName">First Name</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="lastName"
                name="lastName"
                placeholder="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Label htmlFor="lastName">Last Name</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="email"
                type="text"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Label htmlFor="email">Email</Label>
            </FormGroup>
          </Col>
          <Button>Register</Button>
        </Form>
        <Col>
          {props.registerErrors
            ? props.registerErrors.map((error) => (
                <Alert
                  color="info"
                  style={{ width: "fit-content" }}
                  key={error}>
                  {error.replace("instance.", "")}
                </Alert>
              ))
            : null}
        </Col>
      </div>
    </div>
  );
}

export default SignUp;
