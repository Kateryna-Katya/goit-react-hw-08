import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import style from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className={style.wrapper}>
      <p className={style.welcome}>
        Welcome, <span className={style.name}>{user?.name || "Guest"}</span>
      </p>
      <button className={style.logoutBtn} onClick={handleClick} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
