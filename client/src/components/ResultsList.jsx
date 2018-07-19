import React from 'react';

class ResultsList extends React.Component {
  render() {
    return (
      <div className="listView">
        <table className="table table-hover " >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ingredient</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Rum</td>
              <td>Ice</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Lemon</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Potato</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
       </div>
    );
  }
}

export default ResultsList