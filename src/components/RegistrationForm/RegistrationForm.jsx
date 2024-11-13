import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegistrationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password length must be at least 8 characters")
    .required("Password is required"),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch((error) => {
        if (error === "Request failed with status code 400") {
          actions.setFieldError("email", "User with this email already exists");
        }
      });
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>
            <span>Name:</span>
            <Field type="text" name="name" placeholder="Ivan Ivanov" />
            <ErrorMessage name="name" component="span" />
          </label>
          <label>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              placeholder="example.email@example.com"
            />
            <ErrorMessage name="email" component="span" />
          </label>
          <label>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              placeholder="Your password...."
            />
            <ErrorMessage name="password" component="span" />
          </label>
          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
};
