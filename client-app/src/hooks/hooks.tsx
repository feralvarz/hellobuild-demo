import axios, { AxiosRequestConfig } from "axios";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IUserFormData } from "../types/types";

/**
 * Helper to detect first render in components
 */
export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export function useApiEndpoints(
  fn: Function
): [any, React.Dispatch<React.SetStateAction<Object>>] {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false,
  });
  const [req, setReq] = useState<AxiosRequestConfig | null>(null);

  useEffect(() => {
    if (!req) return;
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false,
    });
    axios(req)
      .then((res) =>
        setRes({
          data: res.data,
          pending: false,
          error: !!res.data.errors || false,
          complete: true,
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true,
        })
      );
  }, [req]);

  return [res, (...args: any) => setReq(fn(...args))];
}

/**
 * A custom hook that builds on useLocation to parse
 * the query string for you *
 */
export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

/**
 * API
 */

/**
 * Custom Hook, post data to Authorize User endpoint
 * @returns Hook
 */
export function useLogin() {
  return useApiEndpoints((data: IUserFormData) => ({
    url: `http://localhost:3000/api/users/authorize`,
    method: "POST",
    data,
  }));
}

/**
 * Sets a new property in Local storage once the user is logged in the App.
 */
export function usePersistLogin(): [any, Function] {
  const [userLoggedIn, setUserLogIn] = useLogin();
  let authed = JSON.parse(JSON.stringify(userLoggedIn));

  // Check if user is already logged in
  if (localStorage.getItem("sessionID")) {
    authed.data = { authorized: true };
  } else {
    if (userLoggedIn.data?.authorized === true) {
      localStorage.setItem("sessionID", JSON.stringify(generateSecret(10)));
    }
  }

  return [authed, setUserLogIn];
}

/**
 * Custom Hook, post data to Register User endpoint
 * @returns Hook
 */
export function useRegister() {
  return useApiEndpoints((data: IUserFormData) => ({
    url: `http://localhost:3000/api/users/register`,
    method: "POST",
    data,
  }));
}

/**
 * Custom Hook, handle GH secret code to generate a token in API
 * @returns Hook
 */
export function useGithubTokenCallback() {
  return useApiEndpoints(({ code }: { code: string }) => ({
    url: `http://localhost:3000/api/github/oauth2callback?code=${code}`,
    method: "POST",
  }));
}

/**
 * Custom Hook, handle Google secret code to generate a token in API
 * @returns Hook
 */
export function useGoogleTokenCallback() {
  return useApiEndpoints(({ code }: { code: string }) => ({
    url: `http://localhost:3000/calendar/oauth2callback?code=${code}`,
    method: "POST",
  }));
}

/**
 * Custom Hook, handles Google's authorization
 * note: after first authorization is necessary to call again this endpoint
 * in order to perform a token refresh
 * @returns Hook
 */
export function useGoogleAuthorizeRefresh() {
  return useApiEndpoints((data: any) => ({
    url: `http://localhost:3000/calendar/authorize`,
    method: "GET",
  }));
}

/**
 * Custom Hook, resets Google's authorization
 * clear token and revokek access in google client
 * @returns Hook
 */
export function useGoogleReset() {
  return useApiEndpoints(() => ({
    url: `http://localhost:3000/calendar/reset/`,
    method: "GET",
  }));
}

/**
 * Custom Hook, check if user has granted authorization to Google
 * @returns Hook
 */
export function useGoogleIsAuthorized() {
  return useApiEndpoints(() => ({
    url: `http://localhost:3000/calendar/authorized`,
    method: "GET",
  }));
}

/**
 * Custom Hook, cancel an event in calendar
 * @returns Hook
 */
export function useCancelCalEvent() {
  return useApiEndpoints((data: any) => ({
    url: `http://localhost:3000/calendar/cancelevent`,
    method: "POST",
    data,
  }));
}

/**
 * Custom Hook, check if user has granted authorization to Github
 * @returns Hook
 */
export function useGithubAuthorized() {
  return useApiEndpoints(() => ({
    url: `http://localhost:3000/api/github/authorized`,
    method: "GET",
  }));
}

/**
 * Custom Hook, List repositories by viewer
 * @returns Hook
 */
export function useListRepos() {
  return useApiEndpoints((data: any) => ({
    url: `http://localhost:3000/api/github/repos`,
    method: "POST",
  }));
}

/**
 * Custom Hook, post data to Register User endpoint
 * @returns Hook
 */
export function useListEvents() {
  return useApiEndpoints((data: any) => ({
    url: `http://localhost:3000/calendar/list`,
    method: "GET",
  }));
}

/**
 * Custom Hook, gets url to open google calendar oauth
 * @returns Hook
 */
export function useCalendarAuthURL() {
  return useApiEndpoints(() => ({
    url: `http://localhost:3000/calendar/auth-url`,
    method: "GET",
  }));
}

/**.
 * Helpers
 */

/**
 * Generates a github url to authorize the application
 */
export function getGithubOAuthURL(): string {
  const ghOptions = {
    clientId: "bdff31232777fec87534",
    scopes:
      "public_repo%20read:gpg_key%20read:org%20read:public_key%20read:repo_hook%20repo:status%20repo_deployment%20user",
    redirectURI: "http://localhost:3001/github/oauth2callback",
  };

  const githubOauthUrl: string = `https://github.com/login/oauth/authorize?client_id=${ghOptions.clientId}&scope=${ghOptions.scopes}&redirect_uri=${ghOptions.redirectURI}`;

  return githubOauthUrl;
}

/**
 * Generates a random hex string from a given size
 * @param size The lenght of the string
 * @returns string
 */
export function generateSecret(size: number): string {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}
