import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DogCard from "./Cards/Cards";
import Pagination from "./Pagination/Pagination";
import NavBar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import Logo from "../LandingPage/Logo"
import {
  getDogs,
  getTemperamentsList,
  orderDogs,
  filterCreated,
  filterDogsByTemperament,
  pageIndex,
} from "../../redux/actions";

import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(9);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const pagesDisplayLimit = 5;
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(1);
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let lastpage = [];
  for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
    // la ultima pagina, esto lo uso de indice para mi nextSup
    lastpage.push(i);
  }
  const [, setRefreshState] = useState(true);

  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
  }, [dispatch]);

  useEffect(
    () => dispatch(pageIndex(indexOfFirstDog, indexOfLastDog)),
    [indexOfFirstDog, indexOfLastDog, dispatch]
  );

  useEffect(() => {
    setCurrentPage(1);
    setMaxPage(5);
    setMinPage(1);
  }, [allDogs]);

  const handleSupPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setMaxPage(5);
      setMinPage(1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage - 1 < minPage) {
        setMaxPage(
          maxPage - pagesDisplayLimit < 5 ? 5 : maxPage - pagesDisplayLimit
        );
        setMinPage(
          minPage - pagesDisplayLimit <= 0 ? 1 : minPage - pagesDisplayLimit
        );
      }
    }
  };

  const handleNext = () => {
    if (currentPage !== lastpage.length) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPage) {
        setMaxPage(maxPage + pagesDisplayLimit);
        setMinPage(minPage + pagesDisplayLimit);
      }
    }
  };

  const handleSupNext = () => {
    const lastPage = lastpage.length;
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
      setMaxPage(lastPage);
      setMinPage(lastPage - pagesDisplayLimit + 1);
    }
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderDogs(e.target.value));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }

  return (
    <div>
      {allDogs.length ? (
        <div className={styles.mainContainer}>
          <div className={styles.navBar}>
            <Logo/>
            <NavBar />
            <SearchBar />
          </div>

          <div className={styles.foContainer}>
            <div className={styles.filters_orders}>
              <div className={styles.select}>
                <select onChange={handleSort}>
                  <option defaultValue value="all" hidden>
                    Order by...
                  </option>
                  <option value="AscendingName">A - Z</option>
                  <option value="DescendingName">Z - A</option>
                  <option value="AscendingWeight">Ascending Weight</option>
                  <option value="DescendingWeight">Descending Weight</option>
                </select>
              </div>

              <div className={styles.select}>
                <select
                  onChange={(e) => {
                    handleFilterCreated(e);
                  }}
                >
                  <option defaultValue value="all" hidden>
                    Source...
                  </option>
                  <option value="Existing">Existing dogs</option>
                  <option value="Created">Yours puppys</option>
                </select>
              </div>

              <div className={styles.select}>
                <select onChange={handleFilteredByTemp}>
                  <option defaultValue value="all">
                    Filter by temp...
                  </option>
                  {temperaments.map((temp) => {
                    return (
                      <option value={temp} key={temp}>
                        {temp}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className={styles.resetBtn}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/89/89940.png"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className={styles.cardArea}>
            {currentDogs.map((el) => {
              return (
                <DogCard
                key={el.id}
                id={el.id}
                name={el.name}
                weight_min={el?.weight}
                weight={el?.weight_min}
                weight_m={el?.weight_max}
                weight_max={el?.weight}
                image={el.image}
                
                temperament={el?.temperament}
                temperaments={el?.temperaments}
                />
              );
            })}
          </div>

          <div className="">
            <Pagination
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              pagination={pagination}
              currentPage={currentPage}
              handlePrev={handlePrev}
              handleSupPrev={handleSupPrev}
              handleNext={handleNext}
              handleSupNext={handleSupNext}
              maxPage={maxPage}
              minPage={minPage}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
