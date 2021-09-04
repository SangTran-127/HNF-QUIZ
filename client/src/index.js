import React from 'react';
import ReactDOM from 'react-dom';
// import './Resources/css/app.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes';
import {firebase} from './firebase.js';

const App = (props) => {
   return (
    <Routes {...props}/>
   )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render( <Router><App user={user}/></Router> ,document.getElementById('root'));
  })