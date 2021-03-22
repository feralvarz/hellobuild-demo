import React from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useRegister } from "../../hooks/hooks";
import { IUserFormData, UserForm } from "../../types/types";
import { Form, Button } from "react-bootstrap";
import { ErrorMessage } from "../Login/Login";

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

  return (
    <div className="base-form-wrapper">
      <div className="container ">
        <div className="row align-items-center h-100">
          <div className="col-4 mx-auto">
            <div className="base-form shadow bg-success">
              <h1 className="h3">Create account</h1>

              <Form onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
                <input type="hidden" autoComplete="false" />
                <Form.Control type="hidden" autoComplete="false" />
                <Form.Group controlId="login-username">
                  <Form.Label className="small">Username</Form.Label>
                  <Form.Control
                    ref={register({ required: true })}
                    type="text"
                    placeholder="Enter username"
                    name="username"
                  />
                  <ErrorMessage
                    message="Invalid username"
                    error={data?.errors?.username}
                  />
                </Form.Group>

                <Form.Group controlId="login-password">
                  <Form.Label className="small">Password</Form.Label>
                  <Form.Control
                    ref={register({ required: true })}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <ErrorMessage
                    message="Invalid password"
                    error={data?.errors?.password}
                  />
                </Form.Group>

                <Button
                  className="mt-4"
                  variant="primary"
                  type="submit"
                  disabled={!isValid}
                  block
                >
                  Signup
                </Button>
              </Form>
              <p className="mt-3 small text-center text-primary">
                <span className="pb-2 d-block">Or</span>

                <Link to="/login" className="text-primary">
                  Return to login
                </Link>
              </p>
            </div>

            {!error && complete && <Redirect to="/login" />}
          </div>
        </div>
      </div>
    </div>
  );
};
