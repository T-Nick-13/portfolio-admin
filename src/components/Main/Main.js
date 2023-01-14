import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import bin from '../../images/light/free-icon-delete-5613811.png';
import mainPage from '../../images/light/icons8-открыть-в-окне-50.png';

function Main(props) {

  const routerType = useLocation().pathname === '/main-page' ? 'newMainCards' : 'newCards';
  const cardList = props.pic.map((i) => {
    return i
  });
  const editClass = props.deletingActive ? '' : 'edit_inactive';
  const counterClass = props.btnChoiceActve ? '' : 'edit__counter_inactive';
  const binClass = props.amountSelectedCards > 0 ? '' : 'edit__img_inactive';
  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function handleChoiceClick() {
    props.onChoiceClick();
  }

  function deleteCard() {
    props.onCardDelete();
  }

  function moveToMainPage() {
    props.onMoveClick();
  }

  React.useEffect(() => {
    const draggableElements = document.querySelector('.masonry').childNodes;
    setTimeout(() => {
      draggableElements.forEach(container => {
        container.addEventListener('dragover', e => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container, e.clientY);//сдвигаемый элемент
          const draggable = document.querySelector('.dragging');//перемещяемый элемент
          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
          findIndex();
        });
      });
    })
  }, [])

  function findIndex() {
    const draggableElements = document.querySelector('.masonry').childNodes;
    draggableElements.forEach((container) => {
      Array.from(container.childNodes).forEach((i) => {
        const cardId = i.id;
        const draggableElNumber = Array.from(container.childNodes).indexOf(i);
        const columnNumber = Array.from(draggableElements).indexOf(container);
        const columnLength = draggableElements.length;
        const newIndexDraggable = draggableElNumber * columnLength + columnNumber;
        cardList.forEach((el, i) => {
          if(el._id === cardId) {
            cardList[i].index = newIndexDraggable;
          }
        });
        localStorage.setItem(routerType, JSON.stringify(cardList));
      })
    })
  }

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(routerType));
    window.addEventListener('beforeunload', () => {
      props.moveCards(data);
    })
    return () => window.addEventListener('beforeunload', () => {
      props.moveCards(data);
    })
  }, [])

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(routerType));
    if (data) {
      props.moveCards(JSON.parse(localStorage.getItem(routerType)));
    }
  }, [])

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  return (
    <main className="main">
      <div className={`edit ${editClass}`}>
        <div className="edit__container">
          <button className="edit__btn" onClick={handleChoiceClick}>{props.btnContent}</button>
          <p className={`edit__counter ${counterClass}`}>Выбрано {props.amountSelectedCards} {objectsAmount}</p>
          <img className={`edit__img ${binClass}`} src={bin} alt="trash bin" onClick={deleteCard} title="удалить"></img>
          <img className={`edit__img ${binClass}`} src={mainPage} alt="trash bin" onClick={moveToMainPage}
            title="на главную страницу"></img>
        </div>
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 580: 2, 900: 3}}
      >
        <Masonry className="masonry" gutter="5px">
          {props.pic.map((card) =>{
            return (
              <Card
                card={card}
                tag={card.tag}
                key={card._id}
                id={card._id}
                onCardSelect={props.onCardSelect}
                btnChoiceActve={props.btnChoiceActve}
                amountSelectedCards={props.amountSelectedCards}
                selectedCards={props.selectedCards}
                selectBtnActive={props.selectBtnActive}
                deleteFromMainPage={props.deleteFromMainPage}
              />
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </main>

  );

}


export default Main;
