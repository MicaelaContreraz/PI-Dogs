import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperamentsList } from "../../redux/actions/index";
import NavBar from "../Home/NavBar/NavBar";
import styles from "./CreateDog.module.css";

function validateForm(input) {
  let errors = {};

  // NAME
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }

  // WEIGHTS
  if (!input.weight_min) {
    // weight min
    errors.weight_min = "Type a valid minimal weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_min)) { //Esta es la expresión regular
    errors.weight_min = "Weight must have min values. Example: '25'";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    // weight max
    errors.weight_max = "Type a valid maxim weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_max)) {
    errors.weight_max = "Weight must have max values. Example: '25'";
  } else {
    errors.weight_max = "";
  }
  // HEIGHTS
  if (!input.height_min) {
    // height min
    errors.height_min = "Type a valid minimal height number";
  } else if (!/\d{1,2}/gi.test(input.height_min)) { //expresion
    errors.height_min = "Height must have min values. Example: '25'";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {
    // height max
    errors.height_max = "Type a valid maxim height number";
  } else if (!/\d{1,2}/gi.test(input.height_max)) {
    errors.height_max = "Height must have max values. Example: '25'";
  } else {
    errors.height_max = "";
  }
  return errors;
}

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperaments).sort(function (
    a,
    b
  ) {
    if (a < b) return -1;
    else return 1;
  });
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
    
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    let oneTemp = input.temperament.find((temp) => temp === e.target.value);
    if (!oneTemp) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    } else alert("Solo puedes seleccionar una vez cada temperamento");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.weight_min &&
      !errors.height_min &&
      !errors.weight_max &&
      !errors.height_max 
    ) {
      alert("Your dog has been created successfully");
      dispatch(postDog(input));
      setInput({
        name: "",
        image: "",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
        
      });
    } else {
      return alert("Something went wrong. Please try again.");
    }
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);


  // NAME
  if (!input.name) {
    errors.name = "You must type a name";
  } else if (!/^[a-zA-Z0-9\s]{1,50}$/.test(input.name)) {
    errors.name = "Name must be alphanumeric and have a maximum of 50 characters";
  } else {
    errors.name = "";
  }

  // WEIGHTS
  if (!input.weight_min) {
    errors.weight_min = "Type a valid minimal weight number";
  } else if (!/^\d{1,2}$/.test(input.weight_min)) {
    errors.weight_min = "Weight must have min values. Example: '25'";
  } else if (input.weight_max && parseInt(input.weight_min) > parseInt(input.weight_max)) {
    errors.weight_min = "Min weight cannot be higher than max weight";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    errors.weight_max = "Type a valid maxim weight number";
  } else if (!/^\d{1,2}$/.test(input.weight_max)) {
    errors.weight_max = "Weight must have max values. Example: '25'";
  } else {
    errors.weight_max = "";
  }

  // HEIGHTS
  if (!input.height_min) {
    errors.height_min = "Type a valid minimal height number";
  } else if (!/^\d{1,2}$/.test(input.height_min)) {
    errors.height_min = "Height must have min values. Example: '25'";
  } else if (input.height_max && parseInt(input.height_min) > parseInt(input.height_max)) {
    errors.height_min = "Min height cannot be higher than max height";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {
    errors.height_max = "Type a valid maxim height number";
  } else if (!/^\d{1,2}$/.test(input.height_max)) {
    errors.height_max = "Height must have max values. Example: '25'";
  } else {
    errors.height_max = "";
  }

  if (input.life_span) {
    const lifeSpanValue = parseInt(input.life_span);
    if (isNaN(lifeSpanValue) || lifeSpanValue <= 0 || lifeSpanValue > 25) {
      errors.life_span = "Life span must be a number between 1 and 25";
    } else {
      errors.life_span = "";
    }
  } else {
    errors.life_span = "";
  }


  return (
    <Fragment>
      <div>
        <NavBar />
      </div>
      <div className={styles.mainContainerCreation}>
        <div>
          <h1 className={styles.label}>CREATE DOG</h1>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.Section}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="name..."
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label className={styles.label}>Image URL</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://..."
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            <div className={styles.Section}>
             
              <label className={styles.label}>Height Min</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="0..."
                min="1"
                max="100"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label className={styles.label}>Height Max</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="0..."
                min="1"
                max="100"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
            
              <label className={styles.label}> Weight Min</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="0..."
                min="1"
                max="100"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label className={styles.label}>Weight Max</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="0..."
                min="1"
                max="100"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label className={styles.label}>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="Range..."
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.life_span}</p>
              </div>
            </div>

            <div className={styles.Section}>
              <label className={styles.label}>Temperaments</label>
              <select
                onChange={(e) => handleSelect(e)}
                className={styles.styled_select}
              >
                {temperament.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
         
              <div className={styles.sidebar_box}>
                {input.temperament.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Cancel</button>
              </Link>
              <button className={styles.button} type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
