import { useState } from "react";
// import { NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Row,
  Button,
  NavLink,
} from "reactstrap";

function JobCard(props) {
  const job = props.job;
  const [applied, setApplied] = useState(props.applied);

  // Apply
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applied) {
      props.apply(job.id);
      setApplied(true);
    }
  };

  return (
    <Card
      style={{
        margin: "1rem",
      }}>
      {props.applied}
      <CardBody>
        <Row>
          <Col>
            <CardTitle tag="h5">{job.title}</CardTitle>
            {!props.companyView ? (
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <NavLink href={`/companies/${job.companyHandle}`}>
                  {job.companyName}
                </NavLink>
              </CardSubtitle>
            ) : null}

            <CardText>
              {!job.salary ? "Salary: Not Reported" : `Salary: $${job.salary}`}
              <br />
              {!job.equity || job.equity === "0"
                ? "Equity: None"
                : `Equity: ${job.equity}`}
            </CardText>
          </Col>
        </Row>
        {!applied ? (
          <Button onClick={handleSubmit}>Apply</Button>
        ) : (
          <Button disabled>Applied</Button>
        )}
      </CardBody>
    </Card>
  );
}

export default JobCard;
