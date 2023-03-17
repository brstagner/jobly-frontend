import { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function Jobs({ apply, getApplications, applications }) {
  const [jobs, setJobs] = useState([]);

  const blankForm = { title: "", minSalary: "", hasEquity: false };
  const [formData, setFormData] = useState(blankForm);

  const [message, setMessage] = useState("loading...");

  /** Pass formData to JoblyApi */
  async function getJobs(formData) {
    let res = await JoblyApi.getJobs(formData);
    setJobs(res);
    res.length ? setMessage("loading...") : setMessage("No matches");
  }

  // Call getJobs on empty formData on initial render
  useEffect(() => {
    getJobs(formData);
    getApplications();
  }, []);

  // Update search terms
  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  // Update checkbox
  const handleCheck = (e) => {
    setFormData((data) => ({
      ...data,
      hasEquity: !formData.hasEquity,
    }));
  };

  // Execute search
  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs(getJobs(formData));
    setFormData(blankForm);
  };

  // HTML form
  const form = (
    <div>
      <h4>Search for a job</h4>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "left" }}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <FormGroup floating>
              <Input
                id="title"
                name="title"
                placeholder="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
              <Label htmlFor="title">Title</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="minSalary"
                name="minSalary"
                placeholder="0"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
              />
              <Label htmlFor="minSalary">Minimum Salary</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check switch>
              <Input
                id="hasEquity"
                name="hasEquity"
                placeholder="on"
                type="checkbox"
                checked={formData.hasEquity}
                onChange={handleCheck}
              />
              <h5 htmlFor="hasEquity" style={{ color: "", fontSize: "20px" }}>
                Has Equity
              </h5>
            </FormGroup>
          </Col>
          <Col>
            <Button>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  // Render "loading..." until initial api call is made
  return (
    <div>
      {form}
      {
        //Check if api call is returned
        jobs.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              flexWrap: "wrap",
            }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ width: "30%" }}>
                <JobCard
                  job={job}
                  companyView={false}
                  apply={apply}
                  applied={applications.includes(job.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <h3 style={{ color: "white" }}>{message}</h3>
        )
      }
    </div>
  );
}

export default Jobs;
