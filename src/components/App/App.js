import React from 'react';
//import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading';
import PopupDel from '../PopupDel/PopupDel';
import { MAIN_API } from '../../utils/config';
import Api from '../../utils/Api';

import { pic } from '../../utils/constants';


let selectedCardsSet = new Set([]);

function App() {

  const [cardsList, setCardsList] = React.useState([]);
  const [formActivity, setFormActivity] = React.useState(false);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setselectedCards] = React.useState([]);
  const [activePopup, setPopupActive] = React.useState(false);

  const btnContent = selectBtnActive ? 'Отменить' : 'Выбрать';

  const api = new Api ({
    baseUrl: MAIN_API,
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`,
    },
  });

  React.useEffect(() => {
    Promise.all([
      //moviesApi.getInitialMovies(),
      api.getSavedMovies()
    ])
    .then(([cards, savedMovies]) => {
      localStorage.setItem('cards', JSON.stringify(cards));
      setCardsList(JSON.parse(localStorage.getItem('cards')));
      //localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      //setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

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
    setPopupActive(true);
  }

  function closePopup() {
    setPopupActive(false);
  }

  function submitDeleting() {
    handleChoiceClick();
    closePopup();
  }

  React.useEffect(() => {

    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
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
          pic={cardsList}
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
          onSubmit={submitDeleting}
        />
      </div>
    </div>
  );
}


export default App;
