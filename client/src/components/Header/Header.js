import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from './hnf.png'
import { Button } from '@material-ui/core'
import { firebase } from '../../firebase'
import './Header.css'
import { showErrorToast, showSuccessToast } from '../utils/tool';
const Header = ({ user }) => {
    const logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            showSuccessToast('Good bye!!')
        }).catch(error => {
            showErrorToast(error.message)
        })
    }
    console.log(user);
    return (
        <div id="navbar">
            <Navbar bg="light" className="">
                <div className="me-auto">
                    <Navbar.Brand>
                        <img src={Logo} alt="logo"
                            className="d-inline-block align-top"
                            width="50"
                            height="50"
                        />{' '}
                        <p style={{ display: 'inline', lineHeight: '45px' }}><span className="align-middle">HNF</span></p>
                    </Navbar.Brand>
                </div>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    {user ?
                        <>
                            <Nav.Item>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Button
                                // variant="outline-dark"
                                onClick={() => logoutHandler()}
                            >Log out</Button>
                        </>
                        :
                        <Nav.Item>
                            <Nav.Link href="/sign_in" >Log in</Nav.Link>
                        </Nav.Item>
                    }

                </Nav>
            </Navbar>
        </div>
    )
}

export default Header
