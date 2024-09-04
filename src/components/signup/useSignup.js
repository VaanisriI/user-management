import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const USER_ROLE = [
  { label: "User", value: "User" },
  { label: "Admin", value: "Admin" },
  { label: "Guest", value: "Guest" },
];

function getInitialValues() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
  };
}

function getRequestPayload(values) {
  const payLoad = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    mobile: values.mobile,
    role: values.role,
    password: values.password,
  };

  return payLoad;
}

function handleSubmitApi(values, setSubmitting, setSignupApiState, navigate) {
  setSubmitting(true);
  setSignupApiState({ loading: true });
  const payLoad = getRequestPayload(values);

  let url = "http://localhost:5000/api/users/signup";

  return axios
    .post(url, payLoad)
    .then((res) => {
      setSubmitting(false);
      setSignupApiState({
        loading: false,
        success: true,
        error: false,
        message: "User Register Successfully",
        data: res?.data || {},
      });

      navigate("/login");
    })
    .catch((err) => {
      setSignupApiState({
        loading: false,
        success: false,
        error: true,
        message:
          err.response?.data?.message || err.request?.message || err.message,
      });
    });
}

function useSignup() {
  const navigate = useNavigate();
  const [signupApiState, setSignupApiState] = useState({
    loading: false,
    error: false,
    message: "",
    success: false,
    data: getInitialValues() || {},
  });

  const [visible, setVisible] = useState({
    password: false,
  });

  return {
    handleSubmit: (values, setSubmitting) => {
      handleSubmitApi(values, setSubmitting, setSignupApiState, navigate);
    },
    initialValues: signupApiState.data,
    role: USER_ROLE,
    visible,
    setVisible,
    isSuccess: signupApiState.success,
    isError: signupApiState.error,
    message: signupApiState.message || "",
    isLoading: signupApiState.loading,
  };
}

export default useSignup;
