import Card from '../Card/Card';

import bin from '../../images/light/free-icon-delete-5613811.png';
import mainPage from '../../images/light/icons8-открыть-в-окне-50.png';

function Main(props) {

  const editClass = props.deletingActive ? '' : 'edit_inactive';
  const counterClass = props.btnChoiceActve ? '' : 'edit__counter_inactive';
  const binClass = props.amountSelectedCards > 0 ? '' : 'edit__img_inactive';
  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function handleChoiceClick() {
    props.onChoiceClick();
  }

  function deleteCard() {
    props.onCardDelete();
  }

  function moveToMainPage() {
    props.onMoveClick();
  }

  return (
    <main className="main" >
      <div className={`edit ${editClass}`}>
        <div className="edit__container">
          <button className="edit__btn" onClick={handleChoiceClick}>{props.btnContent}</button>
          <p className={`edit__counter ${counterClass}`}>Выбрано {props.amountSelectedCards} {objectsAmount}</p>
          <img className={`edit__img ${binClass}`} src={bin} alt="trash bin" onClick={deleteCard} title="удалить"></img>
          <img className={`edit__img ${binClass}`} src={mainPage} alt="trash bin" onClick={moveToMainPage}
            title="на главную страницу"></img>
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
            selectBtnActive={props.selectBtnActive}
          />
        )
      })}
    </main>

  );

}


export default Main;
