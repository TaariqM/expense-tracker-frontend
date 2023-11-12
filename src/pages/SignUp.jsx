import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signUpValidation from "../validation/SignUpValidation";

const SignUp = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = signUpValidation(user);
    setErrors(errorMessages);
    // console.log(errors);

    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      console.log("Form fields are required");
      console.log(user);
      return;
    }
    if (
      Object.values(errorMessages).every((errorMessage) => errorMessage === "")
    ) {
      // console.log("User values before", user);
      try {
        await axios.post("http://localhost:8800/api/v1/register", user);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Bad sign up attempt");
    }
  };

  // useEffect(() => {
  //   const submitData = async () => {
  //     if (!user.firstname || !user.lastname || !user.email || !user.password) {
  //       console.log("Form fields are required");
  //       console.log(user);
  //       return;
  //     }
  //     if (Object.values(errors).every((error) => error === "")) {
  //       console.log("User values before", user);
  //       try {
  //         await axios.post("", user);
  //         navigate("/");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else {
  //       console.log("Bad sign up attempt");
  //     }
  //   };

  //   submitData();
  // }, [errors, user, navigate]);

  return (
    <div className="sign-up">
      <div className="title-container">
        <h1 className="title">Sign Up</h1>
      </div>

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="container">
            <label>First Name</label>
            <div className="fname">
              <input type="text" name="firstname" onChange={handleChange} />
              {errors.noFirstname && (
                <div className="error-text">{errors.noFirstname}</div>
              )}
            </div>
          </div>

          <div className="container">
            <label>Last Name</label>
            <div className="lname">
              <input type="text" name="lastname" onChange={handleChange} />
              {errors.noLastname && (
                <div className="error-text">{errors.noLastname}</div>
              )}
            </div>
          </div>

          <div className="container">
            <label>Email address</label>
            <div className="input-container">
              <input type="text" name="email" onChange={handleChange} />
              {errors.isEmptyEmail && (
                <div className="error-text">{errors.isEmptyEmail}</div>
              )}
              {errors.improperEmail && (
                <div className="error-text">{errors.improperEmail}</div>
              )}
            </div>
          </div>

          <div className="container">
            <label>Password</label>
            <div className="input-container">
              <input type="password" name="password" onChange={handleChange} />
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
