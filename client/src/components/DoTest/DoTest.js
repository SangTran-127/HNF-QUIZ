import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import styles from '../../style/DoTest.module.css'
import TestNav from '../TestNav/TestNav'
import { useHistory } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../utils/tool'
const DoTest = (props) => {
    
    let history = useHistory();
    const res = props.location.state.res;
    const mins = res.time.split(":")[0];
    const secs = (res.time.split(":")[1]) ? res.time.split(":")[1] : 0;
    const length = res.results.length;
    const [ques, setques] = useState(0);
    const [options, setoptions] = useState([]);
    const [question, setquestion] = useState("");
    const [answers, setanswers] = useState({});
    const submithandler = () => {
        let name = localStorage.getItem("name");
        let email = localStorage.getItem("email");
        let pin = localStorage.getItem("pin");

        let score = 0;
        for (let i = 0; i < length; i++) {
            if (answers[i] == res.results[i].correct_answer) {
                score += 1;
            }
        }
        score = (score / length) * 100;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post(
                "/api/test/submit_test",
                {
                    pin,
                    email,
                    name,
                    score,
                },
                options
            )
            .then((res) => {
                showSuccessToast('submit success')
                history.push("/");
            })
            .catch((err) => showErrorToast(err.message));
        // console.log(score);
    };
    function shuffle(array) {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    useEffect(() => {
        for (let i = 0; i < length; i++) {
            res.results[i].question = res.results[i].question.replace(
                /&#?\w+;/g,
                (match) => entities[match]
            );
            res.results[i].correct_answer = res.results[i].correct_answer.replace(
                /&#?\w+;/g,
                (match) => entities[match]
            );
            res.results[ques].incorrect_answers = res.results[
                ques
            ].incorrect_answers.map((x) =>
                x.replace(/&#?\w+;/g, (match) => entities[match])
            );
        }
    }, []);
    useEffect(() => {
        setquestion(res.results[ques].question);
        const newOptions = shuffle([
            res.results[ques].correct_answer,
            ...res.results[ques].incorrect_answers,
        ])
        setoptions(newOptions);
        // shuffle(options);

    }, [ques]);

    const entities = {
        "&#039;": "'",
        "&quot;": '"',
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&#34;": "'",
        "&#034;": '"',
        "&#60;": "<",
        "&#060;": "<",
        "&#62;": ">",
        "&#062;": ">",
        "&amp;": "&",
        "&#38;": "&",
        "&#038;": "&",
    };
    const changeclass = (e) => {
        const domele = e.nativeEvent.path;
        domele.reverse();
        let ans = "";
        for (let ele of domele) {
            if (ele.id === "options") {
                for (let ans of ele.childNodes) {
                    ans.className = styles.container;
                }
            } else if (ele.localName === "div" && ele.id === "") {
                ele.className = styles.containeractive;
                ans = ele.childNodes[0].value;
            }
        }
        setanswers({ ...answers, [ques]: ans });
    };
    // console.log(options);
    return (
        <Fragment>
            <TestNav mins={mins} secs={secs} submithandler={submithandler} />
            <div className={styles.qcontainer}>
                {ques + 1}. {question}
            </div>
            <div id="options">
                {options.map((option, index) => (
                    <div key={index} className={styles.container} onClick={changeclass}>
                        <input
                            className={styles.radios}
                            type="radio"
                            value={option}
                            name="options"
                            id={index.toString()}
                        />
                        <label htmlFor={index.toString()}>
                            {String.fromCharCode("A".charCodeAt(0) + index)}. {option}
                        </label>
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <a
                    onClick={(e) => {
                        if (ques == 0) {
                        } else {
                            setques(ques - 1);
                            let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
                            for (let opt of answeropt) {
                                opt.className = styles.container;
                            }
                        }
                    }}
                    className={styles.buttons1}
                >
                    &#8249;
                </a>
                <a
                    onClick={(e) => {
                        if (ques == length - 1) {
                        } else {
                            setques(ques + 1);
                            let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
                            for (let opt of answeropt) {
                                opt.className = styles.container;
                            }
                        }
                    }}
                    className={styles.buttons2}
                >
                    &#8250;
                </a>
            </div>
        </Fragment>
    )
}

export default DoTest
