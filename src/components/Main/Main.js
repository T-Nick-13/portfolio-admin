import Card from '../Card/Card';

import bin from '../../images/light/free-icon-delete-5613811.png';


function Main(props) {

  const formActivity = props.formActivity ? 'main main_shift' : 'main';
  const deletingClass = props.deletingActive ? '' : 'deleting_inactive';
  const counterClass = props.btnChoiceActve ? '' : 'deleting__counter_inactive';

  function handleChoiceClick() {
    props.onChoiceClick();
  }

  return (
    <main className={formActivity}>
      <div className={`deleting ${deletingClass}`}>
        <div className="deleting__container">
          <button className="deleting__btn" onClick={handleChoiceClick}>{props.btnContent}</button>
          <p className={`deleting__counter ${counterClass}`}>{`Выбрано ${props.amount} объектов`}</p>
          <img className="deleting__bin" src={bin} alt="trash bin picture"></img>
        </div>
      </div>
      {props.pic.map((card) =>{
        return (
          <Card
            card={card}
            tag={card.tag}
            key={card.name}
            onCardSelect={props.onCardSelect}
            btnChoiceActve={props.btnChoiceActve}
          />
        )
      })}
    </main>

  );

}


export default Main;
