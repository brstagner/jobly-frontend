import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Row,
} from "reactstrap";

function CompanyCard(props) {
  const company = props.company;
  return (
    <Card style={{ margin: "1rem" }}>
      <CardBody>
        <Row>
          <Col>
            <CardTitle tag="h5">
              <Row>
                <Col>
                  <a
                    href={`/companies/${company.handle}`}
                    style={{ textDecoration: "none" }}>
                    {company.name}
                  </a>
                </Col>
                <Col>
                  {company.logoUrl ? (
                    <img
                      alt={`${company.name} company logo`}
                      src={company.logoUrl}
                      style={{ height: "50px" }}
                    />
                  ) : (
                    <div style={{ height: "50px" }}></div>
                  )}
                </Col>
              </Row>
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Employees: {company.numEmployees}
            </CardSubtitle>
            <CardText>{company.description}</CardText>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;
