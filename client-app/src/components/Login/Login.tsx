import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useApiEndpoints } from "../../hooks/hooks";
import { IUserFormData, UserForm } from "../../types/types";

export const Login: React.FC = (props) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [userLoggedIn, setUserLogIn] = useLogin();
  const { data, complete, error } = userLoggedIn;

  return (
    <>
      <h2>Login Component</h2>
      <form onSubmit={handleSubmit(setUserLogIn)} autoComplete="off">
        <input type="hidden" autoComplete="false" />
        <div style={{ marginBottom: 20 }}>
          <label>Username</label>
          <input
            ref={register({ required: true })}
            type="text"
            placeholder="Username"
            name="username"
          />
          {data && data.errors?.username && <small>Invalid Username</small>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
            name="password"
          />
          {data && data.errors?.password && <small>Invalid Password</small>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <button type="submit" disabled={!isValid}>
            Log In
          </button>
        </div>
      </form>

      {!error && complete && <Redirect to="/" />}

      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </>
  );
};

/**
 * Custom Hook, post data to Authorize User endpoint
 * @returns Hook
 */
function useLogin() {
  return useApiEndpoints((data: IUserFormData) => ({
    url: `http://localhost:3000/api/users/authorize`,
    method: "POST",
    data,
  }));
}
