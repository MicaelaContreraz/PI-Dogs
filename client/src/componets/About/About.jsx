
import React, { Fragment } from "react";
import "./About.css"
import { Link } from "react-router-dom";

function About() {
  return (
    <Fragment>

    <div class="about_section">
    <div class="about_text">
      <div class="container">
        <h1 class="about_taital_1"><strong><span >PI</span> Dogs</strong></h1>
        <p class="magna_text"> My name is Micaela Contreraz, I want to share my individual project for Henry's Bootcamp that was developed in Express.JS, PostgreSQL, Sequelize, Node.JS, React, Redux, CSS, HTML, and JavaScript.</p>
        <div class="about_bt">
        <Link class="more_bt" to={"/home"}>
        
        Home...
      </Link>
        </div>
        <div class="about">
          <h1 class="numbar_text">PI</h1>
        </div>
      </div>
    </div>
  </div>
    </Fragment>
  )
}

export default About