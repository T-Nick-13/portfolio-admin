import Card from '../Card/Card';
import Loading from '../Loading/Loading';

import bin from '../../images/light/free-icon-delete-5613811.png';


function Main(props) {

  const formActivity = props.formActivity ? 'main main_shift' : 'main';
  const deletingClass = props.deletingActive ? '' : 'deleting_inactive';
  const counterClass = props.btnChoiceActve ? '' : 'deleting__counter_inactive';
  const binClass = props.amountSelectedCards > 0 ? '' : 'deleting__bin_inactive';
  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function handleChoiceClick() {
    props.onChoiceClick();
  }

  function deleteCard() {
    props.onCardDelete();
  }

  return (
    <main className={formActivity}>
      <div className={`deleting ${deletingClass}`}>
        <div className="deleting__container">
          <button className="deleting__btn" onClick={handleChoiceClick}>{props.btnContent}</button>
          <p className={`deleting__counter ${counterClass}`}>Выбрано {props.amountSelectedCards} {objectsAmount}</p>
          <img className={`deleting__bin ${binClass}`} src={bin} alt="trash bin picture" onClick={deleteCard}></img>
        </div>
      </div>
      {props.pic.map((card) =>{
        return (
          <Card
            card={card}
            tag={card.tag}
            key={card._id}
            onCardSelect={props.onCardSelect}
            btnChoiceActve={props.btnChoiceActve}
            amountSelectedCards={props.amountSelectedCards}
            selectedCards={props.selectedCards}
          />
        )
      })}
    </main>

  );

}


export default Main;
