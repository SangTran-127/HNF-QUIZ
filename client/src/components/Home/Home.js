import React, { useState } from 'react'
import '../../style/Home.css'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { showErrorToast, showSuccessToast } from '../utils/tool.js'
const Home = () => {

    let history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post("/api/test/", { pin, email, name }, options)
            .then((res) => {
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("pin", pin);
                showSuccessToast('good luck!')
                history.push({
                    pathname: "/test",
                    state: { res: res.data },
                });
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
        // console.log(e);
    };
    return (
        <div className="home">
            <div className="container">
                <div className="test-container">
                    <h1 className="text-center">Go test!!!</h1>
                    <br />
                    <form onSubmit={submitHandler}>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            className="input form-control"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            name="name"
                            type="text"
                        />
                        <br />
                        <label htmlFor="email" className="label ">
                            Email:
                        </label>
                        <input
                            className="input form-control"
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="pin" className="form-label">
                            Mã code:
                        </label>
                        <input
                            className="input form-control"
                            onChange={(e) => setPin(e.target.value)}
                            id="pin"
                            name="pin"
                            type="text"
                        />
                        <br />
                        <button className="btn btn-primary" style={{ float: 'right' }}>
                            Submit
                        </button>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
