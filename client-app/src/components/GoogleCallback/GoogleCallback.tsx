import React from "react";
import { Redirect } from "react-router-dom";
import { googleCallbackPipe, useQuery } from "../../hooks/hooks";

// types definitions missing from use-epic package
// @ts-ignore
import { useEpic } from "use-epic";

export const GoogleCallback: React.FC = () => {
  const query = useQuery();
  const code: string | null = query.get("code");
  const [tokenChain] = useEpic(googleCallbackPipe, { deps: { code } });

  return <>{tokenChain && <Redirect to="/events" />}</>;
};
