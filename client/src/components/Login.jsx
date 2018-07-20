import React from 'react';


class Login extends React.Component {
  render () {
    return (
      <div className="formView">
      <form>
        <div className="title">Login</div>
        <input type='text' name='userName' placeholder=" Your username" />
        <input type='text' name='passWord' placeholder=" Your password" />
        <input type="submit" value="Login"/>
      </form>
      </div>
    )
  }
}

export default Login;
