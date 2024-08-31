import { useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

function updateState(updateFn, newValue) {
  updateFn((prevState) => {
    return {
      ...prevState,
      ...newValue,
    };
  });
}

async function handleSubmitApi(values, setSubmitting, setSignInApiState) {
  setSubmitting(true);
  setSignInApiState((prevState) => ({
    ...prevState,
    loading: true,
  }));

  const payLoad = {
    email: values?.email,
    password: values?.password,
  };

  const url = "http://localhost:5000/api/users/login";

  try {
    const res = await axios.post(url, payLoad);

    setSubmitting(false);

    updateState(setSignInApiState, {
      loading: false,
      success: true,
      error: false,
      message: "User Logged in Successfully",
      data: res.data || {},
    });
  } catch (err) {
    setSubmitting(false);

    updateState(setSignInApiState, {
      loading: false,
      success: false,
      error: true,
      message:
        err.response?.data?.message || err.request?.message || err.message,
    });
  }
}

export default function Login() {
  const [signInApiState, setSignInApiState] = useState({
    loading: false,
    error: false,
    message: "",
    success: false,
    data: {
      email: "",
      password: "",
    },
  });

  const [visible, setVisible] = useState({
    password: false,
  });

  return (
    <>
      <LoginForm
        initialValues={signInApiState.data}
        handleSubmit={(values, setSubmitting) => {
          handleSubmitApi(values, setSubmitting, setSignInApiState);
        }}
        visible={visible}
        setVisible={setVisible}
        signInApiState={signInApiState}
      />
    </>
  );
}
