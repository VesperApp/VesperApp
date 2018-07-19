import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import ResultsList from './components/ResultsList.jsx';

class App extends React.Component {
  render() {
    return(
      <div className="main">
        <Header/>
        <ResultsList/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// <Search/>
// <Footer/>
