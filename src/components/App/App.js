import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';

import { pic } from '../../utils/constants';

function App() {

  const [filteredCards, setFilteredCards] = React.useState(pic);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation />
        <Main
          pic={filteredCards}
        />
      </div>
    </div>
  );
}


export default App;
