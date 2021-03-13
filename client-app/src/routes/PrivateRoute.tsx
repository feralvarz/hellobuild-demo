import React from "react";
import { Redirect, Route } from "react-router-dom";

interface IPrivateRoteProps {
  component: React.FC<any>;
  allowWhen: boolean;
  [key: string]: any;
}

export const PrivateRoute = ({
  component: Component,
  allowWhen,
  ...rest
}: IPrivateRoteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        allowWhen === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
