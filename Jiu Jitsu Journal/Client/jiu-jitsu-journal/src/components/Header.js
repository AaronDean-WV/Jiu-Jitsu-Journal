import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../APIManagers/UserProfileManager";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./Header.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const localJournalUser = localStorage.getItem("userProfile")
  const user = JSON.parse(localJournalUser)

  return (
    <div className="header">
      <div className="logoName">
        Jiu Jitsu Journal</div> 
      <Navbar color="black">
        <NavbarBrand className="logo">
        </NavbarBrand>    
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to={`/userprofile/${user?.id}`}>
                  Profile
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink tag={RRNavLink} to="/classlist">
                Class List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={`/report`}>
                Monthly Report
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout();
                      setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
