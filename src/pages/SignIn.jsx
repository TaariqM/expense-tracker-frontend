import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signInValidation from "../validation/SignInValidation";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessages = signInValidation(values);

    try {
      console.log(values);

      await axios
        .post("http://localhost:8800/api/v1/login", values)
        .then((response) => {
          console.log(response);
          if (response.data.length) {
            navigate(
              `/dashboard/${
                response.data[0].user_id
              }/${response.data[0].first_name.toLowerCase()}${"-"}${response.data[0].last_name.toLowerCase()}`
            );
          } else {
            if (errorMessages.isEmptyEmail || errorMessages.improperEmail) {
              setErrors({ ...errorMessages, noMatch: "" });
            } else if (errorMessages.isEmptyPass) {
              setErrors({ ...errorMessages, noMatch: "" });
            } else {
              setErrors({
                ...errorMessages,
                noMatch: "The email or password provided does not match",
              });
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-in">
      <div className="title-container">
        <h1 className="title">Welcome To Expense Tracker</h1>
      </div>

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {errors.noMatch && <span>{errors.noMatch}</span>}
          <div className="container">
            <label>Email address</label>
            <div className="input-container">
              <input
                type="text"
                placeholder="example@gmail.com"
                name="email"
                onChange={handleChange}
              />
              {errors.isEmptyEmail && (
                <div className="error-text">{errors.isEmptyEmail}</div>
              )}
              {errors.improperEmail && (
                <div className="error-text">{errors.improperEmail}</div>
              )}
            </div>
          </div>

          <div className="container">
            <div className="pwd-forgot-pwd-container">
              <label>Password</label>
              <div className="forgot-pwd-container">
                <a href="/forgot_password" className="forgot-pwd">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="input-container">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              {errors.isEmptyPass && (
                <div className="error-text">{errors.isEmptyPass}</div>
              )}
            </div>
          </div>

          <div className="formButton-container">
            <button className="formButton" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div>
          <p className="not-member">
            Don't have an account?{" "}
            <a href="/signup" className="sign-up-link">
              Sign Up!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
