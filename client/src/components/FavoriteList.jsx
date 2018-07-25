import React from 'react';
import CocktailDetails from './CocktailDetails.jsx';

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrink: null
    };
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(e, drink) {
    e.stopPropagation();
    this.setState({selectedDrink: drink});
  }

  render() {
    const {user, onRemove} = this.props;
    const TableRows = user.favDrinks.map((drink, i) => (
      <tr onClick={(e) => this.handleRowClick(e, drink)} key={i}>

        <th scope="row">{i + 1}</th>
        <td>{drink.strDrink}</td>
        <td>{drink.strCategory}</td>
        <td onClick={(e) => {
          onRemove(e, drink);
          this.handleRowClick(e, null);
        }}>
          <a>
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="listView">
          <div className="fav">
            <h4>
              User favoris should show after login also the result component have been hide
            </h4>
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
              {TableRows}
            </tbody>
          </table>
        </div>
        <CocktailDetails drink={this.state.selectedDrink}/>
      </div>
    );
  }
}

export default FavoriteList;
