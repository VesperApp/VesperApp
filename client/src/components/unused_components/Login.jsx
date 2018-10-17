import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Submit login information.
   * @param {object} event - Event object.
   */
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(stringifyFormData(data));
    var dataToSend = stringifyFormData(data);
    $.ajax({
      url: '/login',
      type: 'POST',
      data: dataToSend,
      contentType: 'application/json',
      success: function(data) {
        if (data === true) {
          location.reload();
          // use local storage
          console.log('ddd', dataToSend);
          localStorage.setItem('users', dataToSend);
        } else {
          alert('Error login ');
        }
      },
      error: function(error) {
        console.error('Ajax error', error.responseText);
        alert('Error login ');
      },
    });
  }

  render() {
    const { onClose } = this.props;
    const { name } = this.constructor;
    return (
      <div className="formView">
        <div
          onClick={() => {
            onClose(name);
          }}
          className="closeSign"
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVHhe7ZxRTsJAFEWrrgkWIGtwPS4BZAnqDuUfGejFhLbOtDNt32vPSe4HGsv0nPBDTCsAAAAAAAAAAAAAAIAczm9vL+eqeqpfuiOc/fxePdcvfRHkn16335cdPUYIZz7tNoef3eYz3Ev9Yx/c5e+25+ucRZD8+/l32y83ERryNScRWuRr9iN0yteMR/hHvmY3QlS+ZjRCgvzbLvdoLkKyfM1YhGT5mqUIveVrRiL0lq9ZinC5gX3rIWObOcJg+WGWPsX1jbiKsBj5wlOExckXHiIsVr6wHGHx8oXFCKuRLzIjfJS84dXJFxYirFa+mDPC6uWLOSIg/4EpIyC/gykiID/CmBGQn8gYEZDfk5IRkD+QTHHXCMjPJDcC8guQFWHIkN9ksgjI72b0CMiPM1oE5KdTPALy+1MsAvKHkx0B+Xnkfwo2BwIMJF++RoTelJOvESGZ8vI1IkQZT75GhE7Gl68RocF08jUi3MmSH76Ovn4l3fK76IiQLT/8/fUaROhPCfn1pW7XGh5hv7oIJeULIiQyhnxBhAhjyhdE6GAK+YIID0wpXxChZg75YvUR5pQvVhvBgnyxugiW5Is6wrH1PaNzFMGifLH4CJbli8VG8CBfLC6CJ/liMRE8yhe5EerLzEt4aFF4tGP7If/ZzPLF4AjWnprVK4IR+aJ3BEvyRXIEY/JFcgSL8kU0glH5IhrBsnzRGcG4fNEZwYN80YjgRL5oRPAkX/xF8PmfB/cIHuWL8Oh3j/JFOLtb+QAAAAAAAAAAAAAAYISq+gWNBEUVaILTDwAAAABJRU5ErkJggg==" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="title">Login</div>
          <input type="text" name="name" placeholder=" Your username" />
          <input type="password" name="password" placeholder=" Your password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

/**
 * Stringify form data.
 * @param {obejct} fd - Data from the form.
 */
function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}

export default Login;
