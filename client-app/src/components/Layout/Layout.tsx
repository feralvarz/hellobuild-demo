import React from "react";
import "./Layout.scss";
import { Image, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../AuthContext";

export const Layout: React.FC = (props) => {
  const { setUserLogIn } = useAuth();

  function handleLogout() {
    localStorage.removeItem("sessionID");
    setUserLogIn({ authorized: false });
  }
  return (
    <div className="layout-wrapper">
      <div className="row h-100">
        <aside className="col-auto text-white sidebar">
          <div className="d-flex flex-column h-100 inner">
            <div className="brand">
              <Image src={Logo} />
            </div>

            <nav className="col">
              <ListGroup variant="flush" className="h-100">
                <ListGroup.Item variant="custom" action>
                  <NavLink to="/github" activeClassName="active">
                    Github
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item variant="custom" action>
                  <NavLink to="/events" activeClassName="active">
                    Events
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item
                  variant="custom"
                  action
                  className="mt-auto"
                  onClick={() => handleLogout()}
                >
                  Logout
                </ListGroup.Item>
              </ListGroup>
            </nav>
          </div>
        </aside>
        <main className="col">
          <div className="h-100">{props.children}</div>
        </main>
      </div>
    </div>
  );
};
