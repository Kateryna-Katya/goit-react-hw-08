import { NavLink } from "react-router-dom";
import clsx from "clsx";

import style from "./AuthNav.module.css";

const AuthNav = () => {
  const navigation = ({ isActive }) => {
    return clsx(style.link, isActive === true && style.active);
  };

  return (
    <div>
      <NavLink className={navigation} to="/register">
        Register
      </NavLink>
      <NavLink className={navigation} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
