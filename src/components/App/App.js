import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function App() {

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation />
      </div>
    </div>
  );
}


export default App;
