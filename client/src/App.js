import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './components/layouts/header'
//import Login from './components/auth/Login'
//import Register from './components/auth/Register'
import Slidexe from './components/layouts/carousel'
import Listtrip from './components/layouts/Listtrip';
import Footer from './components/layouts/footer';
import {setCurrentUser} from './action/auth';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import {Logout} from './action/auth';
import Profile from './components/auth/Profile';
import Notfound from './components/Notfound';
import getFingerprint from './helpers/getFingerprint'
import setHeaders from './helpers/setHeader'


class App extends Component {
  componentDidMount(){
    //goi setCurrentUser/ lay localstorage chua decode
    const token= localStorage.getItem("token");
    if(!token) return;
    const decoded=jwtDecode(token);
    this.props.setCurrentUser(decoded)
    getFingerprint((fingerprint)=>{
      setHeaders(token,fingerprint)
    })
    //logout : neu Date.now->exp (token) trang jwt
    if(Date.now()/1000 > decoded.exp){
      this.props.Logout();
    }
  }
  render(){
    const {isAuthenticated}=this.props.auth
    console.log(isAuthenticated)
    return (
      <div>
        <BrowserRouter>
        <Header/>

        <Route path="/" exact component={Slidexe}/>
        <Route path="/"   exact component=  {Listtrip}/>
        <Route path="/profile" exact component={isAuthenticated ? Profile: Notfound}/>
        <Footer/>
        </BrowserRouter>
      </div>
    );
  }
  
}
const mapStateToProps=(state)=>{
  return {
    auth: state.authReducer
  }
}
export default connect(mapStateToProps, {setCurrentUser,Logout})(App);
//<Route path="/register" exact component={Register}/>
