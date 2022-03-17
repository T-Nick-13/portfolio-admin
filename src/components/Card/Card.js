import React from 'react';

import selectedLogo from '../../images/light/premium-icon-select-2594142.png';

function Card(props) {

  const [activeClass, setActiveClass] = React.useState(false);

  function selectCard() {
    if (props.btnChoiceActve) {
      props.onCardSelect(props.card);
      activeClass ? setActiveClass(false) : setActiveClass(true);
    }
  }

  const overlaySelectedClass = activeClass ? 'card__overlay_selected' : '';
  const selectedClass = activeClass ? 'card__selected_active' : '';

  return (
    <div className="card" >
      <img src={props.card.link} alt={props.card.name} className="card__img" ></img>
      <div className={`card__overlay ${overlaySelectedClass}`} onClick={selectCard} ></div>
      <img src={selectedLogo} alt="selected logo" className={`card__selected ${selectedClass}`} ></img>
      {/* <p className="card__tag" >{props.tag}</p> */}
    </div>
  );
}


export default Card;
