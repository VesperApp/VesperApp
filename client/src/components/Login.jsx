import React from 'react';

class Login extends React.Component {
  render () {
    return (
<<<<<<< HEAD
      <div className="loginBox">
      <h3>Login</h3>
      <form>
=======
      <div className="formView">
      <form>
        <div className="title">Login</div>
>>>>>>> front_end_edits
        <input type='text' name='userName' placeholder=" Your username" />
        <input type='text' name='passWord' placeholder=" Your password" />
        <input type="submit" value="Login"/>
      </form>
      </div>
    )
  }
}

export default Login
