import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useApiEndpoints } from "../../hooks/hooks";
import { IUserFormData, UserForm } from "../../types/types";

export const Signup: React.FC = (props) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [userRegistered, setUserRegistered] = useRegister();
  const { data, complete, error } = userRegistered;

  const removeLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <h2>Signup Component</h2>
      <form onSubmit={handleSubmit(setUserRegistered)} autoComplete="off">
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
            Register
          </button>
        </div>
      </form>

      {!error && complete && <Redirect to="/login" />}

      <div style={{ marginBottom: 20 }}>
        <button onClick={removeLocalStorage}>Remove LocalStorage</button>
      </div>

      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </>
  );
};

/**
 * Custom Hook, post data to Register User endpoint
 * @returns Hook
 */
function useRegister() {
  return useApiEndpoints((data: IUserFormData) => ({
    url: `http://localhost:3000/api/users/register`,
    method: "POST",
    data,
  }));
}
