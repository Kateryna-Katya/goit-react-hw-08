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
      <h2 className={style.text}>
        Welcome, <span>{user?.name || "Guest"}</span>
      </h2>
      <button className={style.button} onClick={handleClick} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
