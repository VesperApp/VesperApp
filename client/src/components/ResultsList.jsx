import React from 'react';
import CocktailDetails from './CocktailDetails.jsx'

class ResultsList extends React.Component {
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
    const TableRows = this.props.drinks.map((drink, i) => (
      <tr onClick={(e) => this.handleRowClick(e, drink)} key={i}>
        <th scope="row">{i + 1}</th>
        <td>{drink.strDrink}</td>
        <td>{drink.strCategory}</td>
        <td>
          <a>
            <span className="glyphicon glyphicon-thumbs-up"></span>
          </a>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="resulView">
        close
        <div className="resultListView">
              <div>
                <h2> Result by ingredients </h2>
              </div>
          <table className="table table-hover " >

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Drink Name</th>
                <th scope="col">Category</th>
                <th scope="col">Save</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
        <CocktailDetails drink={this.state.selectedDrink}/>
      </div>
      </div>
    );
  }
}

export default ResultsList;