import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Profile from "./Profile";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import NotFound from "./NotFound";

function FrontRoutes({
  // functions
  login,
  logout,
  signUp,
  editProfile,
  apply,
  getApplications,
  clearErrors,
  // data
  applications,
  currentUser,
  token,
  signInErrors,
  registerErrors,
  profileErrors,
  applyErrors,
}) {
  return (
    <BrowserRouter>
      <NavBar
        currentUser={currentUser}
        logout={logout}
        clearErrors={clearErrors}
      />
      <main>
        {localStorage.currentUser ? (
          <Routes>
            <Route path="/" element={<Home signInErrors={signInErrors} />} />
            <Route
              path="/companies"
              element={<Companies currentUser={currentUser} token={token} />}
            />
            <Route
              path="/companies/:handle"
              element={
                <Company
                  currentUser={currentUser}
                  token={token}
                  apply={apply}
                  applications={applications}
                />
              }
            />
            <Route
              path="/jobs"
              element={
                <Jobs
                  currentUser={currentUser}
                  token={token}
                  apply={apply}
                  getApplications={getApplications}
                  applications={applications}
                  applyErrors={applyErrors}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  currentUser={currentUser}
                  token={token}
                  editProfile={editProfile}
                  profileErrors={profileErrors}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home signInErrors={signInErrors} />} />
            <Route
              path="/signup"
              element={
                <SignUp signUp={signUp} registerErrors={registerErrors} />
              }
            />
            <Route path="/login" element={<LogIn login={login} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </BrowserRouter>
  );
}

export default FrontRoutes;
