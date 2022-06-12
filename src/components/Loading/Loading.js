import React from 'react';

import uploadLogo from '../../images/light/result.svg';

const urlSet = new Set([]);
const nameSet = new Map();
const tagSet = new Map();
const fileSet = [];

function Loading(props) {

  const [formClass, setFormClass] = React.useState('');
  const [objectURL, setObjectURL] = React.useState([]);


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

  function checkFileType(file) {
    if (
      (file && file.type === "image/png") ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
        urlSet.add(window.URL.createObjectURL(file));
        fileSet.push(file);
        debugger
      } else alert(`Неподходящий формат файла (${file.type}). Используйте jpeg, jpg, png`)
  }


  function handleLoadingInput(e) {
    let files = e.target.files;
    Array.from(files).forEach((file) => {
      checkFileType(file);
    })
    setObjectURL(Array.from(urlSet));
  }

  function handleDrop(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    Array.from(files).forEach((file) => {
      checkFileType(file);
    })
    setObjectURL(Array.from(urlSet));
    setFormClass('');
  }

  function handleNameChange(e) {
    nameSet.set(Array.from(e.target.form).indexOf(e.target), e.target.value);
  }

  function handleTagChange(e) {
    tagSet.set(Array.from(e.target.form).indexOf(e.target), e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    props.addNewCard(fileSet, nameSet, tagSet);
    debugger

  }

  const formActivity = !props.formActivity ? 'form_inactive' : '';

  return (
    <form className={`form ${formClass} ${formActivity}`} onDragOver={handleDragOver}
      onDragLeave={handleDragLeave} onDrop={handleDrop} onSubmit={submit}>
      <img className="form__image" src={uploadLogo} alt="upload picture" />
      <input className="form__input" id="form__input" type="file" accept="image/*" multiple onChange={handleLoadingInput} />
      <label className="form__label" htmlFor="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
      <button className="form__btn" type="submit">Загрузить</button>
      <div className="form__container">
        {objectURL.map((i) => {
          return(
            <div className="form__scetch" key={i}>
              <img src={i} alt="" className="form__img"></img>
              <div className="form__overlay">
                <input className="form__scetch-input" placeholder="Name" onChange={handleNameChange}></input>
                <select className="form__scetch-input" required="required" onChange={handleTagChange}>
                  <option value="">Tag</option>
                  <option value="#card">#card</option>
                  <option value="#advertising">#advertising</option>
                  <option value="#sticker">#sticker</option>
                  <option value="#people">#people</option>
                  <option value="#holidays">#holidays</option>
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </form>
  );
}


export default Loading;
