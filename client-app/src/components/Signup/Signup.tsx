import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import request from "superagent";
import { useFirstRender } from "../../hooks/hooks";

type UserForm = {
  username: string;
  password: string;
};

export const Signup: React.FC = (props) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [signupForm, setSignupForm] = useState<UserForm>({} as UserForm);
  const [userRegistered, setUserRegistered] = useState<string>("");
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender && isValid) {
      const LS = JSON.stringify(signupForm);
      localStorage.setItem("userLogin", LS);
      request
        .post(`http://localhost:3000/api/users/register`)
        .set("Accept", "application/json")
        .send(signupForm)
        .then((response) => {
          setUserRegistered(response.text);
        });
    }
  });

  const removeLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <h2>Signup Component</h2>
      <form onSubmit={handleSubmit(setSignupForm)} autoComplete="off">
        <input type="hidden" autoComplete="false" />
        <div style={{ marginBottom: 20 }}>
          {" "}
          <label>Username</label>
          <input
            ref={register({ required: true })}
            type="text"
            placeholder="Username"
            name="username"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <button type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
      </form>
      {!!userRegistered && (
        <p>
          User <strong>{userRegistered}</strong> has been created.
        </p>
      )}
      <div style={{ marginBottom: 20 }}>
        <button onClick={removeLocalStorage}>Remove LocalStorage</button>
      </div>

      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </>
  );
};
