import React from 'react';

import logo from '../../images/light/free-icon-transition-5592529.png'

function PopupResult(props) {

  return (
    <div className={props.isActive ? "popupResult" : "popupResult popupResult_inactive"}>
      <div className="popupResult__container">
        <img className="popupResult__img" src={logo} alt="data sent"></img>
        <p className="popupResult__info">Вы переходите на страницу для тестирования функций ресурса.
          Все изменения не сохраняются на сервере
        </p>
        <p className="popupResult__counter">переход через {props.secToTransition}</p>
        <button className="popupResult__btn" type="button" onClick={props.closePopup}>Ok</button>
      </div>
    </div>
  )
};

export default PopupResult;
