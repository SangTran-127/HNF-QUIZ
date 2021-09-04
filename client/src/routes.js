import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Admin/Dashboard';
import AuthGuard from './components/Hoc/AuthGuard';
import DoTest from './components/DoTest/DoTest'
import Result from './components/Result/Result'
const Routes = ({user}) => {
  
  let location = useLocation()
  console.log(location);
  return (
    <>
      {location.pathname !== '/test' ? <Header user={user} /> : null}
      <Switch>
        <Route exact path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route path="/sign_in" exact component={SignIn}/>
        <Route path="/" exact component={Home}/>
        <Route exact path="/about_test" component={AuthGuard(Result)} />
        <Route exact path="/test" component={DoTest} user={user}/>
        
      </Switch>
      <ToastContainer />
      {/* <Footer/> */}
    </>

  );
  
}

export default Routes;