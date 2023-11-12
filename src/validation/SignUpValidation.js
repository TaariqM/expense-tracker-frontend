function signUpValidation(values) {
  let errors = {
    noUppercaseChar: "",
    noNumericalChar: "",
    noSpecialChar: "",
    badLength: "",
    isEmptyPass: "",
    isEmptyEmail: "",
    improperEmail: "",
    noFirstname: "",
    noLastname: "",
  };

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$/;
  const upperCase = /[A-Z]/;
  const specialChar = /[!@#$%^&*]/;
  const numericalChar = /[0-9]/;

  if (values.email === "") {
    errors.isEmptyEmail = "Email cannot be empty";
  } else if (!emailPattern.test(values.email)) {
    errors.improperEmail = "Email is not proper";
  }

  if (values.firstname === "") {
    errors.noFirstname = "Please enter your first name";
  }

  if (values.lastname === "") {
    errors.noLastname = "Please enter your last name";
  }

  if (values.password === "") {
    errors.noUppercaseChar =
      "Password must contain at least one uppercase letter";
    errors.noNumericalChar =
      "Password must contain at least one numerical value";
    errors.noSpecialChar =
      "Password must contain at least one special character";
    errors.badLength = "Password must be minimum 8 characters long";
  }

  if (!upperCase.test(values.password)) {
    console.log("No uppercase letter");
    errors.noUppercaseChar =
      "Password must contain at least one uppercase letter";
  }

  if (!specialChar.test(values.password)) {
    console.log("No special character");
    errors.noSpecialChar =
      "Password must contain at least one special character";
  }

  if (!numericalChar.test(values.password)) {
    console.log("No numerical character");
    errors.noNumericalChar =
      "Password must contain at least one numerical value";
  }

  if (values.password.length < 8) {
    console.log("Password length is less than 8");
    errors.badLength = "Password must be minimum 8 characters long";
  }

  return errors;
}

export default signUpValidation;
