import React from 'react';

import uploadLogo from '../../images/light/result.svg';
import uploadLogos from '../../images/light/31oct.jpg';
import uploadLogoss from '../../images/light/12345.jpg';


//const arr = [];
let urlSet = new Set([]);

function Loading(props) {

  const [formClass, setFormClass] = React.useState();
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
    //let files = e.target.files[0];
    let files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      urlSet.add(window.URL.createObjectURL(files[i]));
    }

    setObjectURL(Array.from(urlSet));
    debugger

    //checkFileType(files);
  };

  function onSubmitHandler(e) {
    e.preventDefault();
    let files = e.dataTransfer.files[0];
    //checkFileType(files);
    debugger
  };

  function testy(e) {
    console.log(e.target.value)
    console.log(this)
    console.log(e.currentTarget.value)
    debugger
  }

  const formActivity = !props.formActivity ? 'form_inactive' : '';

  return (
    <form className={`form ${formClass} ${formActivity}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={onSubmitHandler}>
      <img className="form__image" src={uploadLogo} alt="upload picture" />
      <input className="form__input" id="form__input" type="file" accept="image/*" multiple onChange={handleInputChange} />
      <label className="form__label" htmlFor="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
      <div className="form__container">
        {objectURL.map((i) => {
          return(
            <div className="form__scetch" key={i}>
              <img src={i} alt="" className="form__img"></img>
              <div className="form__overlay">
                <input className="form__scetch-input" placeholder="Name"></input>
                <select className="form__scetch-input" required="required" onChange={testy}>
                  <option value="">Tag</option>
                  <option value="1">#card</option>
                  <option value="2">#advertising</option>
                  <option value="3">#sticker</option>
                  <option value="4">#people</option>
                  <option value="5">#holidays</option>
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
