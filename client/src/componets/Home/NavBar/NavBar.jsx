import React from "react";
import styles from "./NavBar.module.css";
//import Logo from "../../img/perro.png";

export default function NavBar() {
  return (
    <div>
      <nav className={styles.nav}>
        {/* <a className={styles.a} href="/">
          <div className={styles.logo}>
          <img className={styles.Logo} src={Logo} alt="" />
          </div>
        </a> */}

        <ul className={styles.ul}>
          <li className={styles.li}>
            <a className={styles.enlace} href="/">
              LandingPage
            </a>
            <a className={styles.enlace} href="/home">
              HOME
            </a>
            <a className={styles.enlace} href="/create">
              CREATE
            </a>
            <a className={styles.enlace} href="/about">
              ABOUT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
