import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading';
import PopupDel from '../PopupDel/PopupDel';
import Statistic from '../Statistic/Statistic';
import Login from '../Login/Login';
import { MAIN_API } from '../../utils/config';
import Api from '../../utils/Api';

let selectedCardsSet = new Set([]);

function App() {

  const [cardsList, setCardsList] = React.useState([]);
  const [formActivity, setFormActivity] = React.useState(false);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [statActive, setStatActive] = React.useState(false);
  const [cardsListActive, setCardsListActive] = React.useState(true);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [activePopup, setPopupActive] = React.useState(false);

  const btnContent = selectBtnActive ? 'Отменить' : 'Выбрать';

  const api = new Api ({
    baseUrl: MAIN_API,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  React.useEffect(() => {
    Promise.all([
      api.getCards()
    ])
    .then(([cards]) => {
      localStorage.setItem('cards', JSON.stringify(cards));
      setCardsList(JSON.parse(localStorage.getItem('cards')));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  function handleLoading() {
    formActivity ? setFormActivity(false) : setFormActivity(true);
    setDeletingActive(false);
    cancelSelection();
    setCardsListActive(false);
  }

  function handleLogoClick() {
    setFormActivity(false);
    setDeletingActive(false);
    cancelSelection();
    setStatActive(false);
    setCardsListActive(true)
  }

  function handleClickDelete() {
    if(deletingActive) {
      setDeletingActive(false);
      cancelSelection();
    } else {
      setDeletingActive(true);
    }
    setFormActivity(false);
    setCardsListActive(true);
    setStatActive(false);
  }

  function clickStat() {
    setStatActive(true);
    cancelSelection();
    setCardsListActive(false);
    setFormActivity(false);
    setDeletingActive(false);
  }

  function cancelSelection() {
    setSelectBtnActive(false);
    selectedCardsSet.clear();
    setCardsAmount(0);
    setSelectedCards(Array.from(selectedCardsSet));
  }

  function handleChoiceClick() {
    if (selectBtnActive) {
      cancelSelection();
    }
    else {
      setSelectBtnActive(true);
    }
  }

  function selectCard(card) {
    selectedCardsSet.has(card) ? selectedCardsSet.delete(card) : selectedCardsSet.add(card);
    setCardsAmount(selectedCardsSet.size);
    setSelectedCards(Array.from(selectedCardsSet));
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

    const delCard = selectedCards.map((c) => {
      return c._id;
    })

    api.deleteCard(delCard)
      .then(() => {
        const newCards = cardsList.filter(c => !delCard.includes(c._id));
        setCardsList(newCards);
        setDeletingActive(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function addNewCard(fileArr, nameSet, tagSet) {

    const data = new FormData();

    fileArr.forEach((f) => {
      data.append('link', f);
    })

    nameSet.forEach((f) => {
      data.append('name', f);
    })

    tagSet.forEach((f) => {
      data.append('tag', f);
    })

    api.saveCard(data)
      .then((m) => {
        setCardsList([...m, ...cardsList]);
        setFormActivity(false);
    })
      .catch((err) => {
      console.log(err)
      })
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
          onStatClick={clickStat}
        />

        <PopupDel
          activePopup={activePopup}
          amountSelectedCards={cardsAmount}
          onPopupClose={closePopup}
          onSubmit={submitDeleting}
        />

        <Routes>

          <Route
            path="/signin"
            element={ <Login /> }
          />

          <Route
            path="/"
            element={
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
                cardsListActive={cardsListActive}
              />
            }
          />
          <Route
            path="/upload"
            element={
              <Loading
                formActivity={formActivity}
                addNewCard={addNewCard}
              />
            }
          />

          <Route
            path="/statistic"
            element={
              <Statistic
                cards={cardsList}
                statActive={statActive}
              />
            }
          />

        </Routes>

      </div>
    </div>
  );
}


export default App;
