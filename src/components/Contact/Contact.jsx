import style from "./Contact.module.css";
import { deleteContact } from "../../redux/contacts/operations";

import { FaPhone } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .catch((error) => console.error("Failed to delete contact:", error));
  };

  return (
    <li className={style.item}>
      <div className={style.container}>
        <div className={style.swipper}>
          <IoPerson style={{ fontSize: "12px" }} />
          <p className={style.text}>{name}</p>
        </div>
        <div className={style.swipper}>
          <FaPhone style={{ fontSize: "12px" }} />
          <p className={style.text}>{number}</p>
        </div>
      </div>
      <button className={style.delete} type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
