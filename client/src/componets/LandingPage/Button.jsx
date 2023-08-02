import React, { Fragment } from "react";
import styles from "../LandingPage/LandingPage.module.css";
import { Link } from "react-router-dom";

export default function Button() {
  return (
    <Fragment>
      <div>
        <Link className={styles.Link} to={"/home"}>
          lets go !
        </Link>
      </div>
    </Fragment>
  );
}
