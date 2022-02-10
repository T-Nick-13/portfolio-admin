import React from 'react';

function Card(props) {


  return (
    <div className="card" >
      <img src={props.card.link} alt={props.card.name} className="card__img" ></img>
      <div className="card__overlay" ></div>
      <p className="card__tag" >{props.tag}</p>
    </div>
  );
}


export default Card;
