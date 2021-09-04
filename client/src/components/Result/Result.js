import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import teststyles from "../../style/Testelement.module.css";
import axios from "axios";
import ResultElement from "./ResultElement.component";
import styles from "../../style/Dashboard.module.css";
import resultstyles from "../../style/TestResult.module.css";

function Result(props) {
  let history = useHistory();

  const [result, setresult] = useState([]);

  let expiry = new Date(props.location.state.expiry);
  console.log(props);
  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
       
      },
    };
    axios
      .post("/api/test/get_result", { pin: props.location.state.pin }, options)
      .then((res) => setresult(res.data))
      .catch((err) => {
        console.log(err);
        alert("Couldn't Fetch!");
        history.push("/dashboard");
      });
  }, []);
  return (
    <Fragment>
      <div>
        <h1
          className={teststyles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome 
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => history.goBack()}
      >
        &lt;- Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className={teststyles.container}>
        <div className={resultstyles.info}>
          <h1 style={{ textAlign: "center" }}> About Test</h1>
          <strong>Mã code: </strong> {props.location.state.pin}
          <br />
          <strong>Title: </strong> {props.location.state.title}
          <br />
          <strong>Số câu hỏi: </strong> {props.location.state.amount}
          <br />
          <strong>Thời gian: </strong> {props.location.state.time} <br />
          <strong>Thời hạn: </strong> {expiry.getDate()}-{expiry.getMonth()}-
          {expiry.getFullYear()}
          <br />
        </div>
        <div className={resultstyles.parent}>
          <div className={resultstyles.resultrow}>
            <div className={teststyles.element}>
              <strong>Name</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Email</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Score</strong>
            </div>
          </div>
          {result.length === 0 ? (
            <div className={resultstyles.resultrow}>
              <div
                className={teststyles.element}
                style={{ gridColumnStart: "2" }}
              >
                No result found!
              </div>
            </div>
          ) : (
            result.map((obj) => <ResultElement key={obj._id} {...obj} />)
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Result;
