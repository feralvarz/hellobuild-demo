import React from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { UserForm } from "../../types/types";
import { Form, Button } from "react-bootstrap";

export const Login: React.FC = (props) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { userLoggedIn, setUserLogIn } = useAuth();
  const { data, complete, error } = userLoggedIn;

  return (
    <div className="base-form-wrapper">
      <div className="container ">
        <div className="row align-items-center h-100">
          <div className="col-4 mx-auto">
            <div className="base-form shadow">
              <h1 className="h3">Login</h1>

              <Form onSubmit={handleSubmit(setUserLogIn)} autoComplete="off">
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
                <Form.Group controlId="login-check">
                  <Form.Check
                    type="checkbox"
                    label="I will hire Fernando"
                    className="small"
                    checked
                    disabled
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid}
                  block
                >
                  Login
                </Button>
              </Form>
              <p className="mt-3 small text-center">
                <span className="pb-2 d-block">Or</span>

                <Link to="/signup" className="text-success">
                  Signup here
                </Link>
              </p>
            </div>

            {!error && complete && <Redirect to="/profile" />}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IFormErrorProps {
  message: string;
  error: boolean;
}
export const ErrorMessage = (props: IFormErrorProps) => {
  return props.error ? (
    <Form.Text className="text-danger">{props.message}</Form.Text>
  ) : (
    <></>
  );
};
