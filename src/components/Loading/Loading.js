import React from 'react';

//import uploadLogo from '../../images/light/uploadCircle.svg';
import uploadLogo from '../../images/light/result.svg';

function Loading(props) {

  const [formClass, setFormClass] = React.useState();

  function handleDragOver(e) {
    e.preventDefault();
    setFormClass('form_dragover');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    let dx = e.pageX - e.currentTarget.offsetLeft;
    let dy = e.pageY - e.currentTarget.offsetTop;
    if ((dx < 0) || (dx > e.currentTarget.clientWidth) || (dy < 0) || (dy > e.currentTarget.clientHeight)) {
      setFormClass('');
    };
  }

  function handleDrop(e) {
    e.preventDefault();
    setFormClass('');
    let files = e.dataTransfer.files;
  }

  function handleOnSend() {
    debugger
    let files = this.files;
    console.log(files)
  }

  const formActivity = !props.formActivity ? 'form_inactive' : '';

  return (
    <form className={`form ${formClass} ${formActivity}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <img className="form__image" src={uploadLogo} alt="upload picture" />
      {/* <div> */}
      <input className="form__input" id="form__input" type="file" accept="image/*" multiple onChange={handleOnSend} />
      <label className="form__label" htmlFor="form__input">Выберите файлы </label>
      <span className="form__span">или перетащите их сюда</span>
      {/* </div> */}
    </form>
  );
}


export default Loading;
