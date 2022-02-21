import Card from '../Card/Card';


function Main(props) {

  const formActivity = props.formActivity ? 'main main_shift' : 'main';

  return (
    <main className={formActivity}>
      {props.pic.map((card) =>{
        return (
          <Card
            card={card}
            tag={card.tag}
            key={card.name}

          />
        )
      })}
    </main>

  );

}


export default Main;
