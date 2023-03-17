import { Alert } from "reactstrap";

function Home(props) {
  return (
    <div>
      <h4>Welcome to Jobly. Get a job.</h4>
      {props.signInErrors
        ? props.signInErrors.map((error) => (
            <Alert color="info" style={{ width: "fit-content" }} key={error}>
              {error.replace("instance.", "")}
            </Alert>
          ))
        : null}
    </div>
  );
}

export default Home;
