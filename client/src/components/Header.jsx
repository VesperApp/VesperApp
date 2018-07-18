import React from 'react';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Search from './Search.jsx';


class Header extends React.Component {
  render () {
    return(
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
        </div>
      </div>
    )
  }
}

export default Header

//add Login component
//add Sign up component
