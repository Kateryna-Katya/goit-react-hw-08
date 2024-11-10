import { useSelector } from "react-redux";
import Contact from "../Contact/Contact.jsx";
import style from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/slice.js";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={style.list}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} {...contact} />
      ))}
    </ul>
  );
};
export default ContactList;
