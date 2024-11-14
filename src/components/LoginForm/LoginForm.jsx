import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import * as Yup from "yup";
import style from "./LoginForm.module.css";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const logInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password length must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={logInSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.form}>
          <label className={style.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              placeholder="example.email@example.com"
            />
            <ErrorMessage name="email" component="span" />
          </label>

          <label className={style.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              placeholder="Your password..."
            />
            <ErrorMessage name="password" component="span" />
          </label>

          <button type="submit" className={style.button}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
