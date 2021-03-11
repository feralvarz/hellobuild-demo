import axios, { AxiosRequestConfig } from "axios";
import { useRef, useEffect, useState } from "react";

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
