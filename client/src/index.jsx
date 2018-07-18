import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Header from './components/Header.jsx';

class App extends React.Component {
  render() {
    return(
      <div className="main">
          {
             <Header/>
            // <Search/>
            // <ResultsList/>
            // <Footer/>
          }
      </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('app'));