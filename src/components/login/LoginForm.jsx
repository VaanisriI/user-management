import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

function LoginForm({
  initialValues,
  handleSubmit,
  visible,
  setVisible,
  signInApiState,
}) {
  const navigate = useNavigate();


  

  const { login, hasAuthenticated } = useAuth();

  useEffect(() => {
    if (signInApiState.success) {
      login(signInApiState?.data?.token);
      window.location.href = "/";
    }
  }, [signInApiState?.data?.token, login, signInApiState.success]);

  useEffect(() => {
    if (hasAuthenticated) {
      navigate("/");
    }
  }, [hasAuthenticated, navigate]);

 

  return (
    <div className="mx-auto min-h-screen max-w-screen-lg border md:bg-white">
      <div className="text-text-color mb-5 text-center font-poppins text-2xl font-semibold">
        Login
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          return handleSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => {
          const values = formikProps.values;
          const isSubmitting = formikProps.isSubmitting;

          return (
            <>
              <Form className="p-5">
                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="form-input-label hidden md:block"
                  >
                    User Name
                  </label>

                  <Field
                    id="email"
                    name="email"
                    type="text"
                    value={values?.email}
                    placeholder="User Name"
                    className="form-input"
                  />
                </div>

                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="password"
                    className="form-input-label hidden md:block"
                  >
                    Password
                  </label>

                  <div className="  flex items-center gap-3">
                    <Field
                      id="password"
                      name="password"
                      type={visible?.password ? "text" : "password"}
                      value={values?.password}
                      placeholder="Password"
                      className="form-input w-full"
                    />

                    {values?.password ? (
                      <img
                        src={`${
                          visible?.password
                            ? "/icons/eye.svg"
                            : "/icons/eye-off.svg"
                        }`}
                        alt="tick"
                        className=" w-5 h-5 cursor-pointer"
                        onClick={() =>
                          setVisible((prevState) => {
                            return {
                              ...prevState,
                              password: !visible?.password,
                            };
                          })
                        }
                      />
                    ) : null}
                  </div>
                </div>

                <div className=" flex items-center justify-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={` bg-violet-700 text-white font-semibold, text-lg mt-10 flex h-12 w-32 items-center justify-center rounded
                        ${isSubmitting ? "btn-disabled" : ""}`}
                  >
                    {isSubmitting ? "Please wait..." : "Save"}
                  </button>

                  <Link
                    to={`/signup`}
                    className={` bg-white border border-violet-700 text-violet-700 font-semibold, text-lg mt-10 flex h-12 w-32 items-center justify-center rounded
                        `}
                  >
                    Register
                  </Link>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

LoginForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  visible: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  signInApiState: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    success: PropTypes.bool,
    data: PropTypes.object,
  }).isRequired,
};
export default LoginForm;
