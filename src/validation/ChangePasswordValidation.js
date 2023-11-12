function changePasswordValidation(values) {
  let errors = {
    // isEmptyPass: "",
    badLength: "",
    noUppercaseChar: "",
    noNumericalChar: "",
    noSpecialChar: "",
  };

  const upperCase = /[A-Z]/;
  const specialChar = /[!@#$%^&*]/;
  const numericalChar = /[0-9]/;

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
    errors.noUppercaseChar =
      "Password must contain at least one uppercase letter";
  }

  if (!specialChar.test(values.password)) {
    errors.noSpecialChar =
      "Password must contain at least one special character";
  }

  if (!numericalChar.test(values.password)) {
    errors.noNumericalChar =
      "Password must contain at least one numerical value";
  }

  if (values.password.length < 8) {
    errors.badLength = "Password must be minimum 8 characters long";
  }

  return errors;
}

export default changePasswordValidation;
