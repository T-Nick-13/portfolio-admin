import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading'

import { pic } from '../../utils/constants';


function App() {

  const [filteredCards, setFilteredCards] = React.useState(pic);
  const [formActivity, setFormActivity] = React.useState(false);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [btnBoolean, setBtnBoolean] = React.useState(false);
  const [selectedCards, setSelectedCards] = React.useState([]);

  const btnContent = btnBoolean ? 'Отменить' : 'Выбрать';

  function handleLoading() {
    formActivity ? setFormActivity(false) : setFormActivity(true);
    setDeletingActive(false);
  }

  function handleLogoClick() {
    setFormActivity(false);
    setDeletingActive(false);
  }

  function handleClickDelete() {
    deletingActive ? setDeletingActive(false) : setDeletingActive(true);
    setFormActivity(false);
  }

  function handleChoiceClick() {
    btnBoolean ? setBtnBoolean(false) : setBtnBoolean(true);
  }

  function selectCard(card) {
    if (btnBoolean) {
      setSelectedCards([card,...selectedCards]);
    }
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation
          handleLoading={handleLoading}
          onLogoClick={handleLogoClick}
          iconIsActive={formActivity}
          onDeleteClick={handleClickDelete}
        />
        <Main
          pic={filteredCards}
          formActivity={formActivity}
          deletingActive={deletingActive}
          onChoiceClick={handleChoiceClick}
          btnContent={btnContent}
          btnChoiceActve={btnBoolean}
          onCardSelect={selectCard}
        />
        <Loading
          formActivity={formActivity}/>
      </div>
    </div>
  );
}


export default App;
