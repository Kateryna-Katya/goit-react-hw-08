import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={style.wrapper}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
