import React from 'react';

function PopupDel(props) {

  const activePopup = props.activePopup || props.activeMove ? 'popup popup_active' : 'popup';
  const activeForm = props.activePopup || props.activeMove? 'popup__form popup__form_active' : 'popup__form';

  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  const popupType = props.activeMove ? 'Переместить ' : 'Удалить ';

  function closePopup() {
    props.onPopupClose();
  }

  function submitEdit(e) {
    e.preventDefault();
    props.activeMove ? props.onSubmitMove() : props.onSubmitDelete();
  }

  return (
    <div className={activePopup}>
      <form className={activeForm} noValidate onSubmit={submitEdit}>
        <button className="popup__btn" type="submit">{popupType} {props.amountSelectedCards} {objectsAmount}</button>
        <button className="popup__btn popup__btn_cancel" type="button" onClick={closePopup}>Отмена</button>
      </form>
    </div>
  );
}

export default PopupDel;
