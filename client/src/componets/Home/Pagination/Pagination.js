import styles from "./Pagination.module.css";

export default function Pagination({
  dogsPerPage,
  allDogs,
  pagination,
  currentPage,
  handleNext,
  handleSupNext,
  handleSupPrev,
  handlePrev,
  maxPage,
  minPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <section>
      <nav>
        {pageNumbers.length === 0 ? (
          <p></p>
        ) : (
          <ul className={styles.pagination}>
            <li
              className={`${styles.btn} ${styles.prev}`}
              onClick={handleSupPrev}
            >
              ◀🐾
            </li>
            <li className={`${styles.btn} ${styles.prev}`} onClick={handlePrev}>
              {"<"}
            </li>

            {pageNumbers?.map((number) => {
              if (number <= maxPage && number >= minPage) {
                return (
                  <li
                    key={number}
                    id={number}
                    className={`${styles.btn} ${
                      number === currentPage ? styles.active : styles.inactive
                    }`}
                    onClick={() => pagination(number)}
                  >
                    {number}
                  </li>
                );
              } else {
                return null;
              }
            })}

            <li
              className={`${styles.btn} ${styles.next}`}
              onClick={handleNext}
              disabled={currentPage === Math.ceil(allDogs / dogsPerPage)}
            >
              {">"}
            </li>
            <li
              className={`${styles.btn} ${styles.next}`}
              onClick={handleSupNext}
              disabled={currentPage === Math.ceil(allDogs / dogsPerPage)}
            >
             🐾▶
            </li>
          </ul>
        )}
      </nav>
    </section>
  );
}
