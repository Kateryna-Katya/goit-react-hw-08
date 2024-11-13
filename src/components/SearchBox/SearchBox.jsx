import { useDispatch, useSelector } from "react-redux";
import style from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={style.container}>
      <h2 className={style.title} id="search-title">
        Find contacts by name
      </h2>
      <input
        className={style.input}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name..."
        aria-labelledby="search-title"
      />
    </div>
  );
};

export default SearchBox;
