import React, {useState} from "react";
import styles from "../../style/TestNav.module.css";
import Timer from '../Timer/Timer';
import axios from "axios";

function TestNav(props) {
  return (
    <div className={styles.header}>
      <div className={styles.navitems}>
        <div></div>
        <div className={styles.timer}>
          <Timer {...props} />
        </div>
        <div className={styles.submit} onClick={props.submithandler}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default TestNav;
