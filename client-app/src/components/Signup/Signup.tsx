import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useRegister } from "../../hooks/hooks";
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

  const handleSignUp = (data: IUserFormData) => {
    localStorage.setItem("userLogin", JSON.stringify(data));
    setUserRegistered(data);
  };

  const removeLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <h2>Signup Component</h2>
      <form onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
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
