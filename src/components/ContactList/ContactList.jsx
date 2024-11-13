import { useSelector } from "react-redux";
import Contact from "../Contact/Contact.jsx";
import style from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={style.list}>
      {filteredContacts && filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact key={contact.id} {...contact} />
        ))
      ) : (
        <p>No contacts found.</p>
      )}
    </ul>
  );
};

export default ContactList;
