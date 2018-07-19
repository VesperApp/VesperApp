import React from 'react';

class FavoriteList extends React.Component {
  render() {
    return (
      <div className="listView">
        <table className="table table-hover " >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Drink</th>
              <th scope="col">Category</th>
              <th scope="col">Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>3 Wise Men</td>
              <td>Alchoholic</td>
              <td>thumbs up icon</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>252</td>
              <td>Alchoholic</td>
              <td>thumbs up icon</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>A Day at the Beach</td>
              <td>Alchoholic</td>
              <td>thumbs up icon</td>
            </tr>
          </tbody>
        </table>
       </div>
    );
  }

}

export default FavoriteList;
