import axios from "axios";

/*~~~~~~~~~~~~~~GETS~~~~~~~~~~~~~~*/
export function getDogs() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperamentsList() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/temperament");
    const temperaments = json.data.map((el) => el.name);

    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temperaments,
    });
  };
}

export const getDetail = (id) => {
  try {
    return async function (dispatch) {
      const detail = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: detail.data,
      });
    };
  } catch (err) {
    alert("ID NOT FOUND");
    console.log(err);
  }
};

/*~~~~~~~~~~~~~~POST~~~~~~~~~~~~~~*/
export function postDog(payload) {
  return async function () {
    const response = await axios.post("http://localhost:3001/puppy", payload);
    return { type: "POST_DOG", response };
  };
}

/*~~~~~~~~~~~~~~ORDERS~~~~~~~~~~~~~~*/
export const orderDogs = (payload) => {
  return {
    type: "ORDER_DOGS",
    payload,
  };
};

/*~~~~~~~~~~~~~~FILTERS~~~~~~~~~~~~~~*/
export function filterDogsByTemperament(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/dog/?temperament=${payload}`
      );
      return dispatch({
        type: "FILTER_DOGS_TEMPS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "Error on the filters in actions file");
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

/*~~~~~~~~~~~~~~SEARCH~~~~~~~~~~~~~~*/
export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      return dispatch({
        type: "SEARCH_DOG",
        payload: data,
      });
    } catch (err) {
      alert("PUPPY NOT FOUND :C");
    }
  };
}

export function resetDetail(payload) {
  return {
    type: "RESET_DETAIL",
    payload,
  };
}

export function pageIndex(payload) {
  return { type: "PAG_INDEXES", payload };
}
