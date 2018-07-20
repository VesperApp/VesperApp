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
      logoutBtn : false
    }
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
              <div className="login btn">
                Login
              </div>
              <div className="sign btn">
                Sign up
              </div>
              {this.state.logoutBtn === true ?
              <div className="logout btn">
                Log out
              </div> : null
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
