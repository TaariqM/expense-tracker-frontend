import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import passwordValidation from "../validation/ChangePasswordValidation";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessages = passwordValidation(values);
    console.log(errorMessages);

    if (
      errorMessages.badLength ||
      errorMessages.noNumericalChar ||
      errorMessages.noSpecialChar ||
      errorMessages.noUppercaseChar
    ) {
      setErrors({ ...errorMessages });
    } else {
      try {
        await axios.post(
          "http://localhost:8800/api/v1/forgot_password",
          values
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="forgot-password">
      <div className="title-container">
        <h1 className="title">Forgot Password?</h1>
      </div>

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="container">
            <label>Please Enter Your Email</label>
            <div className="input-container">
              <input type="text" name="email" onChange={handleChange} />
            </div>
          </div>

          <div className="container">
            <label>Please Enter Your New Password</label>
            <div className="input-container">
              <input type="text" name="password" onChange={handleChange} />
              {errors.noUppercaseChar && (
                <div className="error-text">{errors.noUppercaseChar}</div>
              )}
              {errors.noNumericalChar && (
                <div className="error-text">{errors.noNumericalChar}</div>
              )}
              {errors.noSpecialChar && (
                <div className="error-text">{errors.noSpecialChar}</div>
              )}
              {errors.badLength && (
                <div className="error-text">{errors.badLength}</div>
              )}
            </div>
          </div>

          <div className="formButton-container">
            <button className="formButton" type="submit">
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
