import React, { useEffect } from "react";
import { useAuth } from "../../AuthContext";
import {
  getGithubOAuthURL,
  useCalendarAuthURL,
  useFirstRender,
  useGoogleAuthorize,
  useListEvents,
  useListRepos,
} from "../../hooks/hooks";

export const Profile: React.FC = (props: any) => {
  const { ghAuthorized, setGHAuthorized } = useAuth();
  const [calAuthURL, setCalAuthURL] = useCalendarAuthURL();
  const [repositories, setRequestRepos] = useListRepos();
  const [events, setRequestEvents] = useListEvents();
  const [googleAuth, setGoogleAuth] = useGoogleAuthorize();
  console.log(events?.data);

  const firstRender = useFirstRender();
  useEffect(() => {
    if (firstRender) {
      setCalAuthURL({});
    }
  });

  return (
    <>
      <h1>Profile component</h1>
      <div>
        <h2>Github Repositories</h2>
        <button onClick={setGHAuthorized}>Check GH Authorization</button>
        {ghAuthorized?.data !== null && ghAuthorized?.data === false && (
          <a href={getGithubOAuthURL()}>Authorize Github</a>
        )}
        {ghAuthorized?.data && (
          <button onClick={setRequestRepos}>List Repositories</button>
        )}
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
        <h2>Calendar Events</h2>
        <button onClick={setGoogleAuth}>
          {googleAuth.complete ? "Refresh " : "Authorize "}token
        </button>
        {calAuthURL?.data && !googleAuth.complete && (
          <a href={calAuthURL.data}>Authorize Calendar</a>
        )}

        {true && <button onClick={setRequestEvents}>List Repositories</button>}

        {true && (
          <ul>
            {events?.data &&
              events?.data.map((event: any) => (
                <li key={event.id}>
                  <div>
                    <h3>{event.name}</h3>
                    <p>{event.summary}</p>
                    <p>
                      From:{" "}
                      <strong>
                        {new Date(event.start.dateTime).toLocaleString(
                          "en-US",
                          {
                            timeZone: "America/New_York",
                          }
                        )}
                      </strong>{" "}
                      - To:{" "}
                      <strong>
                        {new Date(event.end.dateTime).toLocaleString("en-US", {
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
