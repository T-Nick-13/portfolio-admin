import React from 'react';
import { useLocation } from 'react-router-dom';
import selectedLogo from '../../images/light/premium-icon-select-2594142.png';
import bin from '../../images/light/Удалить.svg';

function Card(props) {

  function selectCard() {
    if (props.btnChoiceActve) {
      props.onCardSelect(props.card);
    }
  }

  function startDrag(e) {
    e.currentTarget.classList.add('dragging');
  }

  function endDrag(e) {
    e.currentTarget.classList.remove('dragging');
  }

  function onDeleteClick() {
    props.card.mainPage = false;
    props.deleteFromMainPage([props.card]);
  }

  const isLiked = props.selectedCards.some(i => i === props.card);
  const overlaySelectedClass = isLiked ? 'card__overlay card__overlay_selected' : 'card__overlay';
  const selectedClass = isLiked ? 'card__selected_active' : '';
  const newClass = !props.selectBtnActive ? 'card__overlay card__overlay_inactive' : overlaySelectedClass;
  const deleteIconClass = useLocation().pathname === '/main-page' ? ' card__delete-icon' : '';

  return (
    <div className="card draggable" draggable="true" onDragStart={startDrag} onDragEnd={endDrag} id={props.id}>
      <img src={props.card.link} alt={props.card.name} className="card__img"></img>
      <div className={newClass} onClick={selectCard} ></div>
      <img src={selectedLogo} alt="selected logo" className={`card__selected ${selectedClass}`} ></img>
      <img src={bin} alt="delete icon" className={`card__selected${deleteIconClass}`} onClick={onDeleteClick}></img>
    </div>
  );
}


export default Card;
