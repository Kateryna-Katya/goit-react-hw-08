import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";

import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import style from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const addStatus = useSelector((state) => state.contacts.addStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  useEffect(() => {
    if (addStatus === "succeeded") {
      dispatch(fetchContacts());
    }
  }, [addStatus, dispatch]);

  return (
    <div className={style.wrapper}>
      <p>Phonebook</p>
      <div>
        <div>
          <ContactForm />
          <SearchBox />
        </div>
        <div>
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
