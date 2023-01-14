import React from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading';
import PopupDel from '../PopupDel/PopupDel';
import Statistic from '../Statistic/Statistic';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute';
import PopupResult from '../PopupResult/PopupResult';
import { MAIN_API } from '../../utils/config';
import Api from '../../utils/Api';

let selectedCardsSet = new Set([]);
let intervalIsActive = true;

function App() {

  const [cardsList, setCardsList] = React.useState([]);
  const [mainCards, setMainCards] = React.useState([]);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [activePopup, setPopupActive] = React.useState(false);
  const [activeMove, setActiveMove] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [unauthorized, setUnauthorized] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [secToTransition, setSecToTransition] = React.useState(7);

  const btnContent = selectBtnActive ? 'Отменить' : 'Выбрать';
  const navigate = useNavigate();

  const api = new Api ({
    baseUrl: MAIN_API,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  function getData() {
    Promise.all([
      api.getCards()
    ])
    .then(([cards]) => {
      localStorage.setItem('cards', JSON.stringify(cards));
      setCardsList(JSON.parse(localStorage.getItem('cards')).sort(function(a, b){
        return a.index-b.index
      }));
      setMainCards(JSON.parse(localStorage.getItem('cards')).filter((i) => i.mainPage === true).sort(function(a, b){
        return a.index-b.index
      }));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  function handleLoading() {
    setDeletingActive(false);
    cancelSelection();
  }

  function handleLogoClick() {
    setDeletingActive(false);
    cancelSelection();
  }

  function handleClickDelete() {
    if(deletingActive) {
      setDeletingActive(false);
      cancelSelection();
    } else {
      setDeletingActive(true);
    }
  }

  function clickStat() {
    cancelSelection();
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
        setDeletingActive(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleLogin(data) {
    const { email, password } = data;
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.statusText === "Unauthorized") {
          setUnauthorized(true);
        } else {
          console.log(err);
        }
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      api.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

    nameSet.forEach((f) => {
      data.append('mainPage', false);
    })

    nameSet.forEach((f) => {
      const count = cardsList.length + Array.from(nameSet.values()).indexOf(f);
      data.append('index', count);
    })

    api.saveCard(data)
      .then((m) => {
        setCardsList([...cardsList, ...m,]);
        setDeletingActive(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closePopup() {
    setIsActive(false);
    setPopupActive(false);
    setActiveMove(false);
    intervalIsActive = false;
  }

  function handleTransition(target) {
    let counter = 7;
    setIsActive(true);
    const timerId = setInterval(() => {
      setSecToTransition(--counter);
      if (counter === 0 || !intervalIsActive) {
        clearInterval(timerId);
        setIsActive(false);
        window.location.replace(target.href);
      }
    }, 1000);
  }

  function moveToMainPage() {
    setActiveMove(true);
  }

  function submitMoveToMainPage() {
    handleChoiceClick();
    closePopup();
    const newCards = selectedCards.map((i) => {
      i.mainPage = true;
      return i;
    })
    api.editCard(newCards)
      .then((m) => {
        setMainCards([...mainCards,...m,]);
        setDeletingActive(false);
        navigate('/main-page');
      })
      .catch((err) => {
      console.log(err)
      })
  }

  function moveCards(data) {
    api.editCard(data)
      .then(() => {
        getData();
        localStorage.removeItem('newCards');
        localStorage.removeItem('newMainCards');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function clickMainPage() {
    setDeletingActive(false);
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

  React.useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation
          handleLoading={handleLoading}
          onLogoClick={handleLogoClick}
          onDeleteClick={handleClickDelete}
          onStatClick={clickStat}
          deletingActive={deletingActive}
          loggedIn={loggedIn}
          handleMainPageClick={clickMainPage}
        />

        <PopupDel
          activePopup={activePopup}
          amountSelectedCards={cardsAmount}
          onPopupClose={closePopup}
          onSubmitDelete={submitDeleting}
          onSubmitMove={submitMoveToMainPage}
          activeMove={activeMove}
        />

        <PopupResult
          isActive={isActive}
          secToTransition={secToTransition}
          closePopup={closePopup}
        />

        <Routes>

          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                unauthorized={unauthorized}
                onLinkClick={handleTransition}
              />
            }
          />

          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              exact path="/"
              element={
                <Main
                  pic={cardsList}
                  deletingActive={deletingActive}
                  onChoiceClick={handleChoiceClick}
                  btnContent={btnContent}
                  btnChoiceActve={selectBtnActive}
                  onCardSelect={selectCard}
                  amountSelectedCards={cardsAmount}
                  selectedCards={selectedCards}
                  onCardDelete={deleteCard}
                  selectBtnActive={selectBtnActive}
                  onMoveClick={moveToMainPage}
                  moveCards={moveCards}
                  key="1"
                />
              }
            />
          </Route>

          <Route path="/upload" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/upload"
              element={
                <Loading
                  addNewCard={addNewCard}
                />
              }
            />
          </Route>

          <Route path="/main-page" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/main-page"
              element={
                <Main
                  pic={mainCards}
                  deletingActive={deletingActive}
                  onChoiceClick={handleChoiceClick}
                  btnContent={btnContent}
                  btnChoiceActve={selectBtnActive}
                  onCardSelect={selectCard}
                  amountSelectedCards={cardsAmount}
                  selectedCards={selectedCards}
                  onCardDelete={deleteCard}
                  selectBtnActive={selectBtnActive}
                  moveCards={moveCards}
                  deleteFromMainPage={moveCards}
                  key="2"
                />
              }
            />
          </Route>

          <Route path="/statistic" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/statistic"
              element={
                <Statistic
                  cards={cardsList}
                />
              }
            />
          </Route>

        </Routes>

      </div>
    </div>
  );
}


export default App;
