import { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function Companies() {
  const [companies, setCompanies] = useState([]);

  const blankForm = { name: "", minEmployees: "", maxEmployees: "" };
  const [formData, setFormData] = useState(blankForm);

  const [message, setMessage] = useState("loading...");

  /** Pass formData (search terms) to JoblyApi
   *
   *  Set matching companies, else set "No matches" message
   */
  async function getCompanies(formData) {
    let res = await JoblyApi.getCompanies(formData);
    setCompanies(res);
    res.length ? setMessage("loading...") : setMessage("No matches");
  }

  // Call getCompanies on empty formData on initial render (get all companies)
  useEffect(() => {
    getCompanies(formData);
  }, []);

  // Update search terms
  const handleChange = (e) => {
    e.preventDefault();
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  // Execute search
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanies(getCompanies(formData));
    setFormData(blankForm);
  };

  // Search Form HTML
  const form = (
    <div>
      <h4>Search for a company</h4>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "left" }}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <FormGroup floating>
              <Input
                id="name"
                name="name"
                placeholder="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <Label htmlFor="name">Name</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup floating>
              <Input
                id="minEmployees"
                name="minEmployees"
                placeholder="0"
                type="number"
                value={formData.minEmployees}
                onChange={handleChange}
              />
              <Label htmlFor="minEmployees">Minimum Employees</Label>
            </FormGroup>
          </Col>
          <Col>
            <Col>
              <FormGroup floating>
                <Input
                  id="maxEmployees"
                  name="maxEmployees"
                  placeholder="0"
                  type="number"
                  value={formData.maxEmployees}
                  onChange={handleChange}
                />
                <Label htmlFor="maxEmployees">Maximum Employees</Label>
              </FormGroup>
            </Col>
          </Col>
          <Col>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      {form}
      {
        //Check if api call is returned, else show "loading..."
        companies.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              flexWrap: "wrap",
            }}>
            {companies.map((company) => (
              <div key={company.handle} style={{ width: "30%" }}>
                <CompanyCard company={company} />
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

export default Companies;
