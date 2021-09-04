import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import TestElement from "../TestNav/TestElement";
import Modal from "react-modal";
import modalstyles from "../../style/Modal.module.css";
import styles from "../../style/Dashboard.module.css";
import teststyles from "../../style/Testelement.module.css";
import resultstyles from "../../style/TestResult.module.css";
import { showSuccessToast, showErrorToast } from '../utils/tool'
Modal.setAppElement("#root");
const Dashboard = ({ user }) => {
  const [tests, setTests] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setamount] = useState("");
  const [time, settime] = useState("");
  const [expiry, setexpiry] = useState(new Date());

  const [titleMenu, setTitleMenu] = useState([]);


  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios.get('/api/quiz/get_title').then(response => {
      const titleList = response.data.map(({ title }) => title);
      let uniqueList = [...new Set(titleList)];
      setTitleMenu(uniqueList)

    })
  }, [])
  const { email } = user
  useEffect(() => {
    axios
      .post("/api/test/get_test", {
        email
      }, options)
      .then((res) => {
        // for (let x of res.data) {
        //   for (let y of topics) {
        //     if (y["id"] == x["topic"]) x.topicname = y["name"];
        //   }
        // }
        console.log(res);
        setTests(res.data);
      })
      .catch((err) => {
        console.log(err);

        //  alert("couldn't fetch please reload");
      });

  }, [modalIsOpen]);
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/test/add_test",
        { title, amount, time, expiry, email, created: new Date() },
        options
      )
      .then((res) => {
        showSuccessToast("test added!!");

        setmodalIsOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
        showErrorToast(err.message);
        // alert("error!");
      });
  };
  return (
    <React.Fragment>
      <div>
        <h1
          className={styles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome to HNF dashboard
        </h1>
      </div>
      <button
        className={styles.buttons}
        // className="btn btn-success"
        style={{ float: "left", display: "block" }}
        onClick={() => setmodalIsOpen(true)}
      >
        + Add Test
      </button>

      <br />
      <br />
      <br />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        className={modalstyles.modal}
        overlayClassName={modalstyles.overlay}
      >
        <Fragment>
          <h1 className={modalstyles.heading}>Create Test</h1>
          <form onSubmit={onSubmit}>
            <label className={modalstyles.labels} htmlFor="title">
              Title:
            </label>
            <select
              id="title"
              name="title"
              className="form-select"
              onChange={(e) => setTitle(e.target.value.toString())}
            >
              {
                titleMenu.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))
              }
            </select>
            <br />
            <label className={modalstyles.labels} htmlFor="amount">
              Số câu hỏi:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              // className={modalstyles.inputs}
              className="form-control"
              onChange={(e) => setamount(e.target.value)}
            />
            <br />
            <label className={modalstyles.labels} htmlFor="time">
              Thời gian (phút):
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className="form-control"
              onChange={(e) => settime(e.target.value)}
            />
            <br />
            <label className={modalstyles.labels} htmlFor="expiry">
              Thời hạn:
            </label>
            <input
              type="date"
              id="expiry"
              name="expiry"
              className="form-control"
              onChange={(e) => setexpiry(e.target.value)}
            />
            <br />
            <button className={modalstyles.buttons} type="submit">
              Submit
            </button>
            <br />
          </form>
        </Fragment>
      </Modal>
      <div className={teststyles.parent}>
        <div className={resultstyles.row}>
          <div className={teststyles.element}>
            <strong>Mã code</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Title</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Số câu</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Thời gian (phút)</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Thời hạn</strong>
          </div>
        </div>
        <div className={styles.testcontainer}>
          {tests.map((obj) => (
            <TestElement key={obj._id} {...obj} />
          ))}
        </div>
      </div>
      <br />
      <br />
    </React.Fragment>
  )
}

export default Dashboard
