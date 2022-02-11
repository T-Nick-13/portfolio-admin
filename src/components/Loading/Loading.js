import React from 'react';

//import uploadLogo from '../../images/light/uploadCircle.svg';
import uploadLogo from '../../images/light/result.svg';

function Loading() {


  return (
    <form className="form">
      <img className="form__image" src={uploadLogo} alt="upload picture" />
      {/* <div> */}
      <input className="form__input" id="form__input" type="file" accept="image/*" multiple />
      <label className="form__label" for="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
      {/* </div> */}
    </form>
  );
}


export default Loading;
