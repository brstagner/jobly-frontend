import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import JoblyApi from "./api";
import Routes from "./Routes";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState();
  const [applications, setApplications] = useState(["none"]);
  const [signInErrors, setSignInErrors] = useState();
  const [registerErrors, setRegisterErrors] = useState();
  const [profileErrors, setProfileErrors] = useState();
  const [applyErrors, setApplyErrors] = useState();

  // Set user, authentication, user applications, and request errors
  useEffect(() => {
    setCurrentUser(localStorage.currentUser);
    setToken(localStorage.token);
    if (localStorage.currentUser) {
      getApplications(localStorage.currentUser);
    }
    setSignInErrors();
    setRegisterErrors();
  }, []);

  /** Register a new user, login that user */
  async function signUp(user) {
    try {
      const res = await JoblyApi.addUser(user);
      setCurrentUser(user.username);
      setToken(res.token);
      localStorage.setItem("currentUser", user.username);
      localStorage.setItem("token", res.token);
    } catch (errors) {
      setRegisterErrors(errors);
    }
  }

  /** Login an existing user */
  async function login(user) {
    try {
      const res = await JoblyApi.loginUser(user);
      setCurrentUser(user.username);
      setToken(res.token);
      localStorage.setItem("currentUser", user.username);
      localStorage.setItem("token", res.token);
    } catch (errors) {
      setSignInErrors(errors);
    }
  }

  /** Logout current user, clear state and localStorage */
  const logout = () => {
    setCurrentUser("");
    setToken("");
    setApplications(["none"]);
    localStorage.clear();
    setSignInErrors();
  };

  /** Update user info by authorized user */
  async function editProfile(data) {
    setProfileErrors();
    try {
      const res = await JoblyApi.editUser(localStorage.currentUser, data);
      return "success";
    } catch (error) {
      setProfileErrors(error);
      return "error";
    }
  }

  /** Apply to a job for a user (enter new user/job pair into database) */
  async function apply(jobId) {
    try {
      await JoblyApi.apply(localStorage.currentUser, jobId);
      setApplications([...applications, jobId]);
    } catch (error) {
      setApplyErrors(error);
    }
  }

  /** Get logged-in user's job applications */
  async function getApplications() {
    const res = await JoblyApi.getUser(localStorage.currentUser);
    res.applications
      ? setApplications(res.applications)
      : setApplications(["none"]);
  }

  function clearErrors() {
    setSignInErrors();
    setRegisterErrors();
    setProfileErrors();
    setApplyErrors();
  }

  return (
    <Container fluid>
      {/* <div>
        Current User: {currentUser} Token:{token} Applications:{applications}
        <br />
        localStorage: U: {localStorage.currentUser} T: {localStorage.token}
      </div> */}
      <Routes
        login={login}
        logout={logout}
        signUp={signUp}
        editProfile={editProfile}
        apply={apply}
        getApplications={getApplications}
        clearErrors={clearErrors}
        applications={applications}
        currentUser={currentUser}
        token={token}
        signInErrors={signInErrors}
        registerErrors={registerErrors}
        profileErrors={profileErrors}
        applyErrors={applyErrors}
      />
    </Container>
  );
}

export default App;
