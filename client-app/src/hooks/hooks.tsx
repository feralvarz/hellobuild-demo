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
 * Custom Hook, post data to Register User endpoint
 * @returns Hook
 */
export function useListRepos() {
  return useApiEndpoints((data: any) => ({
    url: `http://localhost:3000/api/github/repos`,
    method: "POST",
  }));
}
