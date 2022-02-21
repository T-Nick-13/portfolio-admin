import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading'

import { pic } from '../../utils/constants';

function App() {

  const [filteredCards, setFilteredCards] = React.useState(pic);
  const [formActivity, setFormActivity] = React.useState(false);

  function handleLoading() {
    setFormActivity(true);
  }

  function handleLogoClick() {
    setFormActivity(false);
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation
          handleLoading={handleLoading}
          onLogoClick={handleLogoClick}
        />
        <Main
          pic={filteredCards}
          formActivity={formActivity}
        />
        <Loading
          formActivity={formActivity}/>
      </div>
    </div>
  );
}


export default App;
