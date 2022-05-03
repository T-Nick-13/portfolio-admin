import React from 'react';

import uploadLogo from '../../images/light/result.svg';

function Loading(props) {

  const [formClass, setFormClass] = React.useState();

  function handleDragOver(e) {
    e.preventDefault();
    setFormClass('form_dragover');
  }

  function handleDragLeave(e) {
    e.preventDefault();
/*     let dx = e.pageX - e.currentTarget.offsetLeft;
    let dy = e.pageY - e.currentTarget.offsetTop;
    if ((dx < 0) || (dx > e.currentTarget.clientWidth) || (dy < 0) || (dy > e.currentTarget.clientHeight)) {
      setFormClass('');
    }; */
    setFormClass('');
  }

  function checkFileType(files) {
    if (
      (files && files.type === "image/png") ||
      files.type === "image/jpeg" ||
      files.type === "image/jpg"
    ) {
        props.addNewCard(files);
    } else alert('wrong file type')
  }

  function handleInputChange(e) {
    let files = e.target.files[0];
    checkFileType(files);
    debugger
  };

  function onSubmitHandler(e) {
    e.preventDefault();
    let files = e.dataTransfer.files[0];
    checkFileType(files);
    debugger
  };

  const formActivity = !props.formActivity ? 'form_inactive' : '';

  return (
    <form className={`form ${formClass} ${formActivity}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={onSubmitHandler}>
      <img className="form__image" src={uploadLogo} alt="upload picture" />
      <input className="form__input" id="form__input" type="file" /* accept="image/*" multiple */ onChange={handleInputChange} />
      <label className="form__label" htmlFor="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
    </form>
  );
}


export default Loading;
