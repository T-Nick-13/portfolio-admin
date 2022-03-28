import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading';
import PopupDel from '../PopupDel/PopupDel';

import { pic } from '../../utils/constants';


let selectedCardsSet = new Set([]);

function App() {

  const [filteredCards, setFilteredCards] = React.useState(pic);
  const [formActivity, setFormActivity] = React.useState(false);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setselectedCards] = React.useState([]);
  const [activePopup, setPopupActive] = React.useState(false);

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
      setCardsAmount(0);
      setselectedCards(Array.from(selectedCardsSet));
    }
    else {
      setSelectBtnActive(true);
    }
  }

  function selectCard(card) {
    selectedCardsSet.has(card) ? selectedCardsSet.delete(card) : selectedCardsSet.add(card);
    setCardsAmount(selectedCardsSet.size);
    setselectedCards(Array.from(selectedCardsSet));
  }

  function deleteCard() {
    /* setSelectBtnActive(false);
    selectedCardsSet.clear();
    setCardsAmount(0);
    setselectedCards(Array.from(selectedCardsSet)); */
    setPopupActive(true);
  }

  function closePopup() {
    setPopupActive(false);
  }

  React.useEffect(() => {

    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
        console.log('hi')
      }
    }
    function handleOverlayClose (evt) {
      if (evt.target.classList.contains('popup_active')) {
        closePopup();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [])

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
          onCardDelete={deleteCard}
        />
        <Loading
          formActivity={formActivity}
        />
        <PopupDel
          activePopup={activePopup}
          amountSelectedCards={cardsAmount}
          onPopupClose={closePopup}
        />
      </div>
    </div>
  );
}


export default App;
