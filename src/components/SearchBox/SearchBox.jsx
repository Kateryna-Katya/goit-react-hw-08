import { useDispatch, useSelector } from "react-redux";
import style from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filters/slice";

const Searchbox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>Find contacts by name</h2>
      <input
        className={style.input}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name...."
      />
    </div>
  );
};
export default Searchbox;
