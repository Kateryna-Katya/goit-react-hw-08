import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const INITIAL_VALUES = {
    name: "",
    number: "",
  };
  const phoneNumberRegex =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  const AddContactSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Phone is required")
      .matches(
        phoneNumberRegex,
        "Invalid phone number. Phone must be +380XXXXXXXXX"
      ),
  });
  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={AddContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <label className={style.label}>
          <span>Name:</span>
          <Field
            type="text"
            name="name"
            className={style.input}
            placeholder="Ivan Ivanov"
          />
          <ErrorMessage
            className={style.errorMessage}
            name="name"
            component="span"
          />
        </label>
        <label className={style.label}>
          <span>Phone:</span>
          <Field
            className={style.input}
            type="text"
            name="number"
            placeholder="+38xxxxxxxxxx"
          />
          <ErrorMessage name="number" component="span" />
        </label>
        <button className={style.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
