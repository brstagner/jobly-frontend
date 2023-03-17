import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

function NavBar({ currentUser, logout, clearErrors }) {
  return (
    <Navbar className="navbar">
      <NavbarBrand className="link-light navbar-brand mb-0 h1 fs-2" href="/">
        Jobly
      </NavbarBrand>
      {localStorage.currentUser ? (
        <Nav>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              to="/companies">
              Companies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              to="/jobs">
              Jobs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              to="/profile">
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              onClick={logout}>
              Log out ({localStorage.currentUser})
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        <Nav>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              onClick={clearErrors}
              to="/login">
              Log in
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="link-light m-5 h5 text-decoration-none"
              onClick={clearErrors}
              to="/signup">
              Sign up
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
}

export default NavBar;
