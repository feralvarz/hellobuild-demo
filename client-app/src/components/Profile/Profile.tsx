import React, { useEffect, useRef } from "react";
import { useAuth } from "../../AuthContext";
import {
  getGithubOAuthURL,
  useCalendarAuthURL,
  useCancelCalEvent,
  useFirstRender,
  useGoogleAuthorizeRefresh,
  useListEvents,
  useListRepos,
} from "../../hooks/hooks";

export const Profile: React.FC = (props: any) => {
  const {
    ghAuthorized,
    setGHAuthorized,
    googleAuthorized,
    setGoogleAuthorized,
  } = useAuth();

  const [calAuthURL, setCalAuthURL] = useCalendarAuthURL();
  const [repositories, setRequestRepos] = useListRepos();
  const [events, setRequestEvents] = useListEvents();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cancelledEvent, setCancelCalEvent] = useCancelCalEvent();
  const calEventRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleAuthRefresh, setGoogleAuthRefresh] = useGoogleAuthorizeRefresh();

  useEffect(() => {
    if (cancelledEvent.data !== calEventRef.current) {
      calEventRef.current = cancelledEvent.data;
      setRequestEvents({});
    }
  });

  const firstRender = useFirstRender();
  useEffect(() => {
    if (firstRender) {
      setCalAuthURL({});
      setGHAuthorized({});
      setRequestRepos({});

      setGoogleAuthorized();
      setGoogleAuthRefresh({});
      setGoogleAuthRefresh({});
      setRequestEvents({});
    }
  });

  return (
    <>
      <h1>Profile component</h1>
      <div>
        <h2>Github Repositories</h2>
        {/* <button onClick={setGHAuthorized}>Check GH Authorization</button> */}
        {ghAuthorized?.data !== null && ghAuthorized?.data === false && (
          <a href={getGithubOAuthURL()}>Authorize Github</a>
        )}
        {/* {ghAuthorized?.data && (
          <button onClick={setRequestRepos}>List Repositories</button>
        )} */}
        {ghAuthorized?.data && (
          <ul>
            {repositories.data &&
              repositories.data.map((repo: any) => (
                <li key={repo.id}>{repo.name}</li>
              ))}
          </ul>
        )}
      </div>

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
                      {new Date(calEvent.start.dateTime).toLocaleString(
                        "en-US",
                        {
                          timeZone: "America/New_York",
                        }
                      )}
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
    </>
  );
};
