import React from "react";
import { Card } from "react-bootstrap";
import { calendarPipe } from "../../hooks/hooks";
import { ICalEvent } from "../../types/types";
import { Layout } from "../Layout/Layout";
import "./CalendarEvents.scss";

// types definitions missing from use-epic package
// @ts-ignore
import { useEpic } from "use-epic";

export const CalendarEvents: React.FC = (props) => {
  const [calendar, dispatch] = useEpic(calendarPipe);
  const refresh = () => dispatch("refresh");
  const cancelEvent = (data: ICalEvent) => {
    dispatch({ type: "cancelEvent", payload: data });
  };

  return (
    <Layout>
      <div className="row h-100">
        <div className="col content">
          <div className="inner">
            <h1 className="d-flex">
              Calendar Events
              {calendar?.authorized && calendar?.error && (
                <span>
                  <button
                    onClick={refresh}
                    className="btn btn-success btn-sm ml-2"
                  >
                    Refresh token
                  </button>
                </span>
              )}
            </h1>

            {calendar?.reloadMessage}

            {calendar?.authorized === false && (
              <div className="row">
                <div className="col">
                  <p>
                    Google calendar needs your authorization to run in this app{" "}
                  </p>
                  <div className="">
                    <a
                      href={calendar.authUrl}
                      className="btn btn-primary btn-sm"
                      rel="noopener"
                    >
                      Authorize Calendar
                    </a>
                  </div>
                </div>
              </div>
            )}

            {calendar && !!calendar.events?.length && (
              <div className="events-list">
                <div className="row ">
                  {calendar.events.map((calEvent: any) => (
                    <EventCard
                      key={calEvent.id}
                      data={calEvent}
                      callback={cancelEvent}
                    />
                  ))}
                </div>
              </div>
            )}
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
      <Card className="repo-card sh-100 shadow">
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
