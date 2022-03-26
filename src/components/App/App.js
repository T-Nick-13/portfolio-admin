import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading'

import { pic } from '../../utils/constants';


let selectedCardsSet = new Set([]);

function App() {

  const [filteredCards, setFilteredCards] = React.useState(pic);
  const [formActivity, setFormActivity] = React.useState(false);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setselectedCards] = React.useState([]);

  const btnContent = selectBtnActive ? 'Отменить' : 'Выбрать';

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
    if (selectBtnActive) {
      setSelectBtnActive(false);
      selectedCardsSet.clear();
      setselectedCards(Array.from(selectedCardsSet));
    }
    else {
      setSelectBtnActive(true);
      setCardsAmount(0);
    }
  }

  function selectCard(card) {
    selectedCardsSet.has(card) ? selectedCardsSet.delete(card) : selectedCardsSet.add(card);
    setCardsAmount(selectedCardsSet.size);
    setselectedCards(Array.from(selectedCardsSet));
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
          btnChoiceActve={selectBtnActive}
          onCardSelect={selectCard}
          amountSelectedCards={cardsAmount}
          selectedCards={selectedCards}
        />
        <Loading
          formActivity={formActivity}/>
      </div>
    </div>
  );
}


export default App;
