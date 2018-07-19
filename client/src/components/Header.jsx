import React from 'react';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Search from './Search.jsx';


class Header extends React.Component {
  render () {
    return(
<<<<<<< HEAD
      <div className="header">
        <div> <img src="http://www.finsmes.com/wp-content/uploads/2018/05/vesper.png" width="150px"/></div>
        <h1>Vesper header</h1>
        <div>
          <button> Login </button>
            <Login/>
        </div>
        <div>
          <button> sign up </button>
            <SignUp/>
        </div>
        <div>
          <Search/>
=======
      <div className="headerContent">
        <div className="header">
          <div>
            <img src=" http://www.finsmes.com/wp-content/uploads/2018/05/vesper.png" width="150px" className="logo"/></div>
           <h1>Vesper header</h1>
            <div className="login"> Login
            </div>
            <div className="sign">
             sign up
            </div>
            <div className="logout"> Login
            </div>
        </div>

        <div className="insertComponent">
          <div>
              <Login/>
          </div>
          <div>
              <SignUp/>
          </div>

          <div>
            <Search/>
          </div>
>>>>>>> front_end_edits
        </div>
      </div>
    )
  }
}

export default Header

//add Login component
//add Sign up component
