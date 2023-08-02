import React, { Fragment } from "react";
import styles from "../LandingPage/LandingPage.module.css";
import logo from "../img/perroo-removebg-preview.png"

export default function Logo() {
  return (
    <>
     <img className={styles.logo} src={logo} alt="" />
    
    </>
  );
}
