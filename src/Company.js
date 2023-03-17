import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function Company({ apply, applications }) {
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState({});
  const { handle } = useParams();

  // Get company info and jobs for that company
  useEffect(() => {
    async function getCompany() {
      let compRes = await JoblyApi.getCompany(handle);
      setCompany(compRes);
      let jobRes = await JoblyApi.getCompanyJobs(handle);
      setJobs(jobRes);
    }
    getCompany();
  }, []);

  return company && jobs.length ? (
    <Col>
      <Row>
        <Col>
          <h4>{company.name}</h4>
          <div
            style={{
              color: "white",
            }}>
            {company.numEmployees ? (
              <h5>{company.numEmployees} employees</h5>
            ) : null}
            <p>{company.description}</p>
          </div>
        </Col>
        <Col>
          <img src={company.logoUrl} />
        </Col>
      </Row>
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
              companyView={true}
              apply={apply}
              applications={applications}
              applied={applications.includes(job.id)}
            />
          </div>
        ))}
      </div>
    </Col>
  ) : (
    "loading..."
  );
}

export default Company;
