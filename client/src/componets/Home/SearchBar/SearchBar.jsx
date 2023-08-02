import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [dogState, setDogState] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { value } = e.target;
    setDogState(value);
    dispatch(getDogsByName(value)); // Realiza el filtrado y actualiza el estado de Redux
  }

  function handleClick(e) {
    e.preventDefault();

    if (dogState.length === 0) {
      return alert("Please input a name to start the search");
    } else {
      dispatch(getDogsByName(dogState));
      setDogState("");
    }
  }

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchTxt}
        type="text"
        placeholder="Search a dog..."
        value={dogState}
        onChange={handleInputChange} // Cambia el evento onChange
      />

      <a
        className={styles.searchBtn}
        type="submit"
        onClick={handleClick}
        href="/#"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/151/151773.png"
          width="25px"
          height="25px"
          alt="search a dog"
        />
      </a>
    </div>
  );
}
