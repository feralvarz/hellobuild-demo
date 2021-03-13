import React from "react";
import "./Layout.scss";
import { Image, ListGroup } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export const Layout: React.FC = (props) => (
  <div className="layout-wrapper">
    <div className="row h-100">
      <aside className="col-3 text-white">
        <div className="d-flex flex-column h-100 inner">
          <div className="brand">
            <Image src="http://via.placeholder.com/160x48" />
          </div>

          <nav className="col">
            <ListGroup variant="flush" className="h-100">
              <ListGroup.Item variant="custom" action>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item variant="custom" action>
                <NavLink to="/login" activeClassName="active">
                  Repositories
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item variant="custom" action>
                <NavLink to="/signup" activeClassName="active">
                  Upcoming Events
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item variant="custom" action className="mt-auto">
                <NavLink to="/signup" activeClassName="active">
                  Logout
                </NavLink>
              </ListGroup.Item>
            </ListGroup>
          </nav>
        </div>
      </aside>
      <main className="col">
        <div className="inner">{props.children}</div>
      </main>
    </div>
  </div>
);
