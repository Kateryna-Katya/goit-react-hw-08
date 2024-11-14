import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

import style from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = ({ isActive }) => {
    return clsx(style.link, isActive === true && style.active);
  };

  return (
    <div className={style.nav}>
      <NavLink className={navigation} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={navigation} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};
export default Navigation;
