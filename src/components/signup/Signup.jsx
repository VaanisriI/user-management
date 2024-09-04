import { Field, Form, Formik } from "formik";
import useSignup from "./useSignup";
import { Link } from "react-router-dom";
import ErrorMessage from "../../common/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage";
import Loading from "../../common/Loading";

export default function Signup() {
  const {
    handleSubmit,
    initialValues,
    role,
    visible,
    setVisible,
    isError,
    isSuccess,
    message,
    isLoading,
  } = useSignup();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto min-h-screen max-w-screen-lg border md:bg-white m-5">
      <div className="text-text-color mb-5 text-center font-poppins text-2xl font-semibold">
        User Registration
      </div>

      {isSuccess && (
        <SuccessMessage
          isSuccess={isSuccess}
          message={message}
          timeout={3000}
        />
      )}
      {isError && <ErrorMessage message={message} />}

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
                    htmlFor="firstName"
                    className="form-input-label hidden md:block"
                  >
                    First Name
                  </label>

                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={values?.firstName}
                    placeholder="First Name"
                    className="form-input"
                  />
                </div>
                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="lastName"
                    className="form-input-label hidden md:block"
                  >
                    Last Name
                  </label>

                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={values?.lastName}
                    placeholder="Last Name"
                    className="form-input"
                  />
                </div>
                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="form-input-label hidden md:block"
                  >
                    Email
                  </label>

                  <Field
                    id="email"
                    name="email"
                    type="email"
                    value={values?.email}
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="mobile"
                    className="form-input-label hidden md:block"
                  >
                    Mobile
                  </label>

                  <Field
                    id="mobile"
                    name="mobile"
                    type="number"
                    value={values?.mobile}
                    placeholder="Mobile"
                    className="form-input"
                  />
                </div>
                <div className="my-4 gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="role"
                    className="form-input-label hidden md:block"
                  >
                    Role
                  </label>

                  <Field
                    as="select"
                    id="role"
                    name="role"
                    value={values?.role}
                    placeholder="role"
                    className="form-input"
                  >
                    <option value="">Select</option>
                    {role.map((d, idx) => (
                      <option key={idx} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Field>
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
                      type={visible.password ? "text" : "password"}
                      value={values?.password}
                      placeholder="Password"
                      className="form-input w-full"
                    />

                    {values?.password ? (
                      <img
                        src={`${
                          visible.password
                            ? "/icons/eye.svg"
                            : "/icons/eye-off.svg"
                        }`}
                        alt="tick"
                        className=" w-5 h-5 cursor-pointer"
                        onClick={() =>
                          setVisible((prevState) => {
                            return {
                              ...prevState,
                              password: !visible.password,
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
                    to={`/login`}
                    className={` bg-white border border-violet-700 text-violet-700 font-semibold, text-lg mt-10 flex h-12 w-32 items-center justify-center rounded
                        `}
                  >
                    Login
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
