import React from 'react';

const CocktailDetails = props => {
  const { drink, onClose } = props;
  if (drink) {
    return (
      <div className="CockTailDetailsView">
        <div onClick={onClose} className="close">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVHhe7ZxRTsJAFEWrrgkWIGtwPS4BZAnqDuUfGejFhLbOtDNt32vPSe4HGsv0nPBDTCsAAAAAAAAAAAAAAIAczm9vL+eqeqpfuiOc/fxePdcvfRHkn16335cdPUYIZz7tNoef3eYz3Ev9Yx/c5e+25+ucRZD8+/l32y83ERryNScRWuRr9iN0yteMR/hHvmY3QlS+ZjRCgvzbLvdoLkKyfM1YhGT5mqUIveVrRiL0lq9ZinC5gX3rIWObOcJg+WGWPsX1jbiKsBj5wlOExckXHiIsVr6wHGHx8oXFCKuRLzIjfJS84dXJFxYirFa+mDPC6uWLOSIg/4EpIyC/gykiID/CmBGQn8gYEZDfk5IRkD+QTHHXCMjPJDcC8guQFWHIkN9ksgjI72b0CMiPM1oE5KdTPALy+1MsAvKHkx0B+Xnkfwo2BwIMJF++RoTelJOvESGZ8vI1IkQZT75GhE7Gl68RocF08jUi3MmSH76Ovn4l3fK76IiQLT/8/fUaROhPCfn1pW7XGh5hv7oIJeULIiQyhnxBhAhjyhdE6GAK+YIID0wpXxChZg75YvUR5pQvVhvBgnyxugiW5Is6wrH1PaNzFMGifLH4CJbli8VG8CBfLC6CJ/liMRE8yhe5EerLzEt4aFF4tGP7If/ZzPLF4AjWnprVK4IR+aJ3BEvyRXIEY/JFcgSL8kU0glH5IhrBsnzRGcG4fNEZwYN80YjgRL5oRPAkX/xF8PmfB/cIHuWL8Oh3j/JFOLtb+QAAAAAAAAAAAAAAYISq+gWNBEUVaILTDwAAAABJRU5ErkJggg==" />
        </div>
        <div onClick={onClose} className="content">
          <div className="title">{`${drink.strDrink}'s Recipe`}</div>
          <div className="recipe">
            <img src={drink.strDrinkThumb} />
            <p>{drink.strInstructions}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default CocktailDetails;
