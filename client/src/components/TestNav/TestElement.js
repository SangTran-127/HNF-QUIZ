import React from "react";
import { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import styles from "../../style/Testelement.module.css";

function TestElement(props) {
  let expiry = new Date(props.expiry);
  return (
    <Fragment>
      <Link
        to={{ pathname: "/about_test", state: { ...props } }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={styles.row}>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Pin : </strong>
            </span>
            {props.pin}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Topic : </strong>
            </span>
            {props.title}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>No. of Ques : </strong>
            </span>
            {props.amount}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Time Duration (Mins) : </strong>
            </span>
            {props.time} mins
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Expiry : </strong>
            </span>
            {expiry.getDate()}-{expiry.getMonth()}-{expiry.getFullYear()}
          </div>
        </div>
      </Link>
    </Fragment>
  );
}

export default TestElement;
