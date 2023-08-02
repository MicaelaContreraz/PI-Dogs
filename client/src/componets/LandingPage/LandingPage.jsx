import React, { Fragment } from "react";
import Button from "./Button"
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <Fragment>

      <h1 className={styles.title}>WELCOME</h1>
      

      <Button/>

      <h4>by Micaela Contreraz</h4>
    </Fragment>
     
  );
}
