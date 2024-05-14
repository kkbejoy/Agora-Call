import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../api/userAPI";
import GoogleSigin from "./GoogleSigin";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const res = await userLogIn(email, password);

      console.log(res);
      if (res.status) {
        const { email, userName, _id } = res?.user;
        const user = { email, name: userName, _id };
        console.log("user details", user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`user/profile/${res.user.userName}`);
      } else throw new Error("Bad Credentials");
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {};
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        // validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        <Form className="space-y-6" action="#" method="POST">
          <Field
            id="email"
            name="email"
            autoFocus
            type="email"
            autoComplete="email"
            className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
          />
          <Field
            id="password"
            name="password"
            // autoFocus
            type="password"
            autoComplete=""
            className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-light-100 sm:text-sm sm:leading-6"
          />
          <div>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </Form>
      </Formik>
      <GoogleSigin />
    </div>
  );
};

export default Login;
