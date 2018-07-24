import React from 'react';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Search from './Search.jsx';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      login : false,
      sign : false,
      logoutBtn : false,
      user : false,
      userinfo: {}
    }
    this.showLoginComponent = this.showLoginComponent.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    
  }
  componentDidMount(){

    var user = localStorage.getItem("users");
    if(user){
      var objUser = JSON.parse(user)
    }
    
    console.log(user)
    console.log("Json data",objUser)

    if(user != null){
      this.setState({
        user : true,
        userinfo : objUser
      })
    }else{
      this.setState({
        user : false,
        userinfo : {}
      })
    }
  }
  showLoginComponent(){
    this.setState({
      login : true,
      sign : false
    })
  }
  showSignUp(){
    this.setState({
      login : false,
      sign : true
    })
  }

  logOut(){
    window.localStorage.removeItem("users");
    //location.reload();
    this.setState({
      login : false,
      sign : false,
      logoutBtn : false,
      user : false,
      userinfo: {}
    })
  }

  render () {
      return(
      <div className = "headerContent">
        <div className = "header">
          <div>
            <img src = "http://www.finsmes.com/wp-content/uploads/2018/05/vesper.png" width="150px" className="logo"/>
            </div>
            <div className= "appName">
              Vesper
            </div>
            <div className="boxBtn">
              {
                this.state.user == true ? null :  
                <div className="login btn" onClick={this.showLoginComponent} >
                  Login
                </div>
              }
              {
               this.state.user == true  ? null :  
                <div className="sign btn" onClick={this.showSignUp}>
                  Sign up
                </div>
              }
              {
               this.state.user != true  ? null :  
                <div className="userName">
                {
                 this.state.userinfo.name 
                }
                </div>
              }
               {
               this.state.user != true  ? null :  
                <div className="userName favorite">
                 My Favoris
                </div>
              }
              {
                this.state.user != true ? null :  
                <div className="logout btn" onClick={this.logOut}>
                  Log out
                </div>
              }
            </div>
        </div>

        <div className="insertComponent">
          <div>
            {this.state.login ===true ?  <Login/> : null}
          </div>
          <div>
            {this.state.sign ===true ?  <SignUp/> : null}
          </div>
        </div>
      </div>
    )
  }
}
export default Header;

//add Login component
//add Sign up component
