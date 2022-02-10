import Card from '../Card/Card';


function Main(props) {


  return (
    <main className="main">
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
