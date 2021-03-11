import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import request from "superagent";
import { useFirstRender } from "../../hooks/hooks";

type UserForm = {
  username: string | null;
  password: string | null;
};

export interface ILoginResponse {
  authorized: boolean;
  errors?: UserForm;
}

export const Login: React.FC = (props) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [loginForm, setLoginForm] = useState<UserForm>({} as UserForm);

  const [userLoggedIn, setUserLoggedIn] = useState<ILoginResponse>({
    authorized: false,
  });
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender && isValid) {
      request
        .post(`http://localhost:3000/api/users/authorize`)
        .set("Accept", "application/json")
        .send(loginForm)
        .then(({ body }: { body: ILoginResponse }) => {
          setUserLoggedIn(body);
          if (body.authorized) {
            console.log("User is authorized, redirect to home page");
          }
        });
    }
  }, [firstRender, loginForm]);

  return (
    <>
      <h2>Login Component</h2>
      <form onSubmit={handleSubmit(setLoginForm)} autoComplete="off">
        <input type="hidden" autoComplete="false" />
        <div style={{ marginBottom: 20 }}>
          <label>Username</label>
          <input
            ref={register({ required: true })}
            type="text"
            placeholder="Username"
            name="username"
          />
          {userLoggedIn.errors?.username && <small>Invalid Username</small>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
            name="password"
          />
          {userLoggedIn.errors?.password && <small>Invalid Password</small>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <button type="submit" disabled={!isValid}>
            Log In
          </button>
        </div>
      </form>

      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </>
  );
};
