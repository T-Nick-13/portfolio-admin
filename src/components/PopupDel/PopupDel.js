import React from 'react';

function PopupDel(props) {

  const activePopup = props.activePopup ? 'popup_active' : '';
  const activeForm = props.activePopup ? 'popup__form_active' : '';

  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function closePopup() {
    props.onPopupClose();
  }

  return (
    <div className={`popup ${activePopup}`}>
      <form className={`popup__form ${activeForm}`} noValidate /* onSubmit={props.onSubmit} */>
        <button className="popup__btn" type="submit">Удалить {props.amountSelectedCards} {objectsAmount}</button>
        <button className="popup__btn popup__btn_cancel" type="button" onClick={closePopup}>Отмена</button>
      </form>
    </div>
  );
}

export default PopupDel;
