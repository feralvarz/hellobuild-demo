import React, { useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import {
  useCancelCalEvent,
  useListEvents,
  useCalendarAuthURL,
  useGoogleAuthorizeRefresh,
  useFirstRender,
  useGoogleIsAuthorized,
  useGoogleReset,
} from "../../hooks/hooks";
import { ICalEvent } from "../../types/types";
import { Layout } from "../Layout/Layout";
import "./CalendarEvents.scss";

export const CalendarEvents: React.FC = (props) => {
  const [hasGoogleToken, setGoogleAuthorized] = useGoogleIsAuthorized();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cancelledEvent, setCancelCalEvent] = useCancelCalEvent();
  const calEventRef = useRef(null);
  const [events, setRequestEvents] = useListEvents();
  const [calAuthURL, setCalAuthURL] = useCalendarAuthURL();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleAuthRefresh, setGoogleAuthRefresh] = useGoogleAuthorizeRefresh();
  const [googleReset, setGoogleReset] = useGoogleReset();

  const firstRender = useFirstRender();
  useEffect(() => {
    if (cancelledEvent.data !== calEventRef.current) {
      calEventRef.current = cancelledEvent.data;
      setRequestEvents({});
    }
    if (firstRender) {
      setCalAuthURL({});
      setGoogleAuthorized({});
      setRequestEvents({});
    }
  });

  function refresh() {
    setGoogleAuthRefresh({});
    setRequestEvents({});
  }

  function resetAccess() {
    setGoogleReset({});
  }

  return (
    <Layout>
      <div className="row h-100">
        <div className="col content">
          <div className="inner">
            <h1 className="d-flex">
              Calendar Events
              {hasGoogleToken.error && (
                <span className="ml-auto">
                  <a
                    href={calAuthURL.data}
                    className="btn btn-primary btn-sm"
                    rel="noopener"
                  >
                    Authorize Calendar
                  </a>
                </span>
              )}
              {hasGoogleToken.data && events.error && (
                <span className="ml-auto">
                  <button
                    onClick={() => refresh()}
                    className="btn btn-success btn-sm mr-2"
                  >
                    Refresh token
                  </button>
                  <button
                    onClick={() => resetAccess()}
                    className="btn btn-danger btn-sm"
                  >
                    Revoke access
                  </button>
                </span>
              )}
            </h1>

            <div className="row events-list">
              {!!events.data?.length &&
                events.data.map((calEvent: any) => (
                  <EventCard
                    key={calEvent.id}
                    data={calEvent}
                    callback={setCancelCalEvent}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const EventCard: React.FC<{
  data: ICalEvent;
  className?: string;
  callback: Function;
}> = ({ data, className, callback }) => {
  return (
    <div className={`mb-4 ${className || "col-lg-6"}`}>
      <Card className="repo-card h-100 shadow">
        <Card.Body>
          <Card.Title className="text-truncate">
            <a
              href={data.htmlLink}
              className=""
              target="_blank"
              rel="noreferrer"
            >
              {data.summary}
            </a>
            <button
              type="button"
              className="close ml-2 mb-1"
              data-dismiss="toast"
              onClick={() => callback(data)}
            >
              <span aria-hidden="true">🗑</span>
              <span className="sr-only">Close</span>
            </button>
          </Card.Title>
          <div className="row small">
            <div className="col">
              <p>
                <strong>Start: </strong>{" "}
                {new Date(data.start.dateTime).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                })}
              </p>
            </div>

            <div className="col">
              <p>
                <strong>End: </strong>{" "}
                {new Date(data.end.dateTime).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                })}
              </p>
            </div>
          </div>
          <Card.Text className="card-description">
            {data.description || "No description"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
