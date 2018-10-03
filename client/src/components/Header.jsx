import React from 'react';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Search from './Search.jsx';
import FakeFavorisdrink from './FakeFavorisdrink.jsx';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signUp: false,
      logoutBtn: false,
      user: false,
      favComponent: false,
      userinfo: {},
    };
    this.showLoginComponent = this.showLoginComponent.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logOut = this.logOut.bind(this);
    this.showFavoris = this.showFavoris.bind(this);
  }

  componentDidMount() {
    var user = localStorage.getItem('users');
    if (user) {
      var objUser = JSON.parse(user);
    }

    if (user != null) {
      this.setState({
        user: true,
        userinfo: objUser,
      });
    } else {
      this.setState({
        user: false,
        userinfo: {},
      });
    }
  }

  /**
   * Render login component.
   */
  showLoginComponent() {
    this.setState({
      login: true,
      signUp: false,
    });
  }

  /**
   * Render signup component.
   */
  showSignUp() {
    this.setState({
      login: false,
      signUp: true,
    });
  }

  /**
   * Render favoirteList compoenent.
   */
  showFavoris() {
    if (this.state.favComponent === true) {
      this.setState({
        favComponent: false,
      });
    } else {
      this.setState({
        favComponent: true,
      });
    }
  }

  /**
   * When user clicks on logout.
   */
  logOut() {
    window.localStorage.removeItem('users');
    //location.reload();
    this.setState({
      login: false,
      signUp: false,
      logoutBtn: false,
      user: false,
      favComponent: false,
      userinfo: {},
    });
  }

  /**
   * Close specific popup component.
   * @param {string} popupName - name of the popup component that we intend to close.
   */
  handleClose(popupName) {
    if (popupName === SignUp.name) {
      this.setState({ signUp: false });
    } else if (popupName === Login.name) {
      this.setState({ login: false });
    }
  }

  render() {
    return (
      <div className="headerContent">
        <div className="header">
          <div>
            {/* 
            <img src = "http://www.finsmes.com/wp-content/uploads/2018/05/vesper.png" width="150px" className="logo"/>
            */}
          </div>
          <div className="appName">Andy's Tropical Beach Party</div>
          <div className="boxBtn">
            {this.state.user == true ? null : (
              <div className="login btn" onClick={this.showLoginComponent}>
                Login
              </div>
            )}
            {this.state.user == true ? null : (
              <div className="sign btn" onClick={this.showSignUp}>
                Sign up
              </div>
            )}
            {this.state.user != true ? null : <div className="userName">{this.state.userinfo.name}</div>}
            {this.state.user != true ? null : (
              <div className="userName favorite" onClick={this.showFavoris}>
                My Favoris
              </div>
            )}
            {this.state.user != true ? null : (
              <div className="logout btn" onClick={this.logOut}>
                Log out
              </div>
            )}
          </div>
        </div>

        <div className="insertComponent">
          <div>{this.state.login === true ? <Login onClose={this.handleClose} /> : null}</div>
          <div>{this.state.signUp === true ? <SignUp onClose={this.handleClose} /> : null}</div>
          <div>{this.state.favComponent === true ? <FakeFavorisdrink /> : null}</div>
        </div>
      </div>
    );
  }
}
export default Header;
