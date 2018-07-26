import React from 'react';
import CocktailDetails from './CocktailDetails.jsx';

class FakeFavorisdrink extends React.Component {
  constructor(props) {
    super(props);
    
    console.log(localStorage.getItem("users"))
   
  }
 
  render() {
    return (
      <div>
        <div className="formView">
          <div className="fav">
            <div className="title">
               {JSON.parse(localStorage.getItem("users")).name}'s favoris drink 
            </div>
          </div>
          <table className="table table-hover " >
            <thead>
              <tr>
              </tr>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Drink Name</th>
                <th scope="col">Category</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FakeFavorisdrink;
