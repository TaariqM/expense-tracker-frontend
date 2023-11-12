function signInValidation(values, matchErrorMessage = "") {
  let errors = {
    isEmptyPass: "",
    isEmptyEmail: "",
    improperEmail: "",
    noMatch: matchErrorMessage,
  };

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$/;

  if (values.email === "") {
    errors.isEmptyEmail = "Email cannot be Empty";
  } else if (!emailPattern.test(values.email)) {
    errors.improperEmail = "Email is not proper";
  }

  if (values.password === "") {
    errors.isEmptyPass = "Password cannot be empty";
  }

  return errors;
}

export default signInValidation;
