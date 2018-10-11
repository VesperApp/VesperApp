import React from 'react';
import CocktailDetails from './CocktailDetails';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrink: null,
      cockTailDetail: false,
    };
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleclose = this.handleclose.bind(this);
  }

  /**
   * When a row of the result drinks list is clicked, render the clicked drink.
   * @param {object} e - Event object.
   * @param {object} drink - Selected drink.
   */
  handleRowClick(e, drink) {
    e.stopPropagation();
    this.setState({
      cockTailDetail: true,
      selectedDrink: drink,
    });
  }

  /**
   * Close the drink's detail popup.
   */
  handleclose() {
    this.setState({
      cockTailDetail: false,
    });
  }

  render() {
    const { cockTailDetail, selectedDrink } = this.state;
    const { onClose } = this.props;
    const { name } = this.constructor;
    const TableRows = this.props.drinks.map((drink, i) => (
      <tr onClick={e => this.handleRowClick(e, drink)} key={i}>
        <th scope="row">{i + 1}</th>
        <td>{drink.drink_name}</td>
        <td>{drink.Category.category_name}</td>
        <td>
          <a>
            <span className="glyphicon glyphicon-thumbs-up" />
          </a>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="resulView">
          <div className="resultListView">
            <div onClick={() => onClose(name)} className="closeSign">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVHhe7ZxRTsJAFEWrrgkWIGtwPS4BZAnqDuUfGejFhLbOtDNt32vPSe4HGsv0nPBDTCsAAAAAAAAAAAAAAIAczm9vL+eqeqpfuiOc/fxePdcvfRHkn16335cdPUYIZz7tNoef3eYz3Ev9Yx/c5e+25+ucRZD8+/l32y83ERryNScRWuRr9iN0yteMR/hHvmY3QlS+ZjRCgvzbLvdoLkKyfM1YhGT5mqUIveVrRiL0lq9ZinC5gX3rIWObOcJg+WGWPsX1jbiKsBj5wlOExckXHiIsVr6wHGHx8oXFCKuRLzIjfJS84dXJFxYirFa+mDPC6uWLOSIg/4EpIyC/gykiID/CmBGQn8gYEZDfk5IRkD+QTHHXCMjPJDcC8guQFWHIkN9ksgjI72b0CMiPM1oE5KdTPALy+1MsAvKHkx0B+Xnkfwo2BwIMJF++RoTelJOvESGZ8vI1IkQZT75GhE7Gl68RocF08jUi3MmSH76Ovn4l3fK76IiQLT/8/fUaROhPCfn1pW7XGh5hv7oIJeULIiQyhnxBhAhjyhdE6GAK+YIID0wpXxChZg75YvUR5pQvVhvBgnyxugiW5Is6wrH1PaNzFMGifLH4CJbli8VG8CBfLC6CJ/liMRE8yhe5EerLzEt4aFF4tGP7If/ZzPLF4AjWnprVK4IR+aJ3BEvyRXIEY/JFcgSL8kU0glH5IhrBsnzRGcG4fNEZwYN80YjgRL5oRPAkX/xF8PmfB/cIHuWL8Oh3j/JFOLtb+QAAAAAAAAAAAAAAYISq+gWNBEUVaILTDwAAAABJRU5ErkJggg==" />
            </div>
            <div>
              <h2> Result by ingredients </h2>
            </div>
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Drink Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Save</th>
                </tr>
              </thead>
              <tbody>{TableRows}</tbody>
            </table>
          </div>
          {cockTailDetail ? <CocktailDetails drink={selectedDrink} onClose={this.handleclose} /> : ''}
        </div>
      </div>
    );
  }
}

export default ResultsList;
