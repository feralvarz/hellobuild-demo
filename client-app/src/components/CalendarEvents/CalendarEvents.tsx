import React, { useEffect, useRef } from "react";
import { useAuth } from "../../AuthContext";
import {
  useCancelCalEvent,
  useListEvents,
  useCalendarAuthURL,
  useGoogleAuthorizeRefresh,
  useFirstRender,
} from "../../hooks/hooks";

export const CalendarEvents: React.FC = (props) => {
  const { googleAuthorized, setGoogleAuthorized } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cancelledEvent, setCancelCalEvent] = useCancelCalEvent();
  const calEventRef = useRef(null);
  const [events, setRequestEvents] = useListEvents();
  const [calAuthURL, setCalAuthURL] = useCalendarAuthURL();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleAuthRefresh, setGoogleAuthRefresh] = useGoogleAuthorizeRefresh();

  const firstRender = useFirstRender();
  useEffect(() => {
    if (cancelledEvent.data !== calEventRef.current) {
      calEventRef.current = cancelledEvent.data;
      setRequestEvents({});
    }
    if (firstRender) {
      setCalAuthURL({});
      // setGHAuthorized({});
      // setRequestRepos({});

      setGoogleAuthorized();
      setGoogleAuthRefresh({});
      setGoogleAuthRefresh({});
      setRequestEvents({});
    }
  });
  return (
    <div>
      <h2>
        Calendar Events <span></span>
        {googleAuthorized.data && events.errors && (
          <button onClick={setGoogleAuthRefresh}>Refresh token</button>
        )}
      </h2>

      {googleAuthorized.data === false && (
        <a href={calAuthURL.data}>Authorize Calendar</a>
      )}

      {/* {true && <button onClick={setRequestEvents}>List Events</button>} */}

      {!!events?.data?.length && (
        <ul>
          {events?.data.map((calEvent: any) => (
            <li key={calEvent.id}>
              <div>
                <h3>
                  {calEvent.name}{" "}
                  <span>
                    <button onClick={() => setCancelCalEvent(calEvent)}>
                      Remove
                    </button>
                  </span>
                </h3>
                <p>{calEvent.summary}</p>
                <p>
                  From:{" "}
                  <strong>
                    {new Date(calEvent.start.dateTime).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })}
                  </strong>{" "}
                  - To:{" "}
                  <strong>
                    {new Date(calEvent.end.dateTime).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })}
                  </strong>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
