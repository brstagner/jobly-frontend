import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Input, Label, Button, Alert } from "reactstrap";
import JoblyApi from "./api";
import "./forms.css";

function Profile({ editProfile, profileErrors }) {
  let navigate = useNavigate();

  const [formData, setFormData] = useState();

  useEffect(() => {
    async function getUser() {
      let res = await JoblyApi.getUser(localStorage.currentUser);
      setFormData({
        firstName: res.firstName,
        lastName: res.lastName,
        password: "",
        email: res.email,
      });
    }
    getUser();
  }, []);

  /** Update formData */
  const handleChange = (e) => {
    e.preventDefault();
    // persist to avoid React v16 'event pooling'
    e.persist();
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  /** Call editProfile with appropriate item type and form data */
  const handleSubmit = async (e) => {
    let res;
    e.preventDefault();
    if (!formData.password) {
      res = await editProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
    } else {
      res = await editProfile(formData);
    }
    if (res === "success") {
      navigate("/");
    }
  };

  return formData ? (
    <div>
      <h4>Edit Profile</h4>
      <div style={{ display: "flex", justifyContent: "left", width: "60%" }}>
        <Form onSubmit={handleSubmit}>
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
          <Button>Save Changes</Button>
        </Form>
        <Col>
          {profileErrors
            ? profileErrors.map((error) => (
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
  ) : null;
}

export default Profile;
