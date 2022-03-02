import Die from './components/Die';
import './App.css';
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice,setDice] = React.useState(allNewDice())

  const[tenzies,setTenzies] = React.useState(false)


  // Imperative way
  // React.useEffect(() => {
  //   console.log("Dice state changed")
  //   let win = true
  //   for(let i = 0; i < dice.length;i++){
  //     if(dice[i].isHeld !== true){
  //       win = false;
  //       return;
  //     } else{
  //       for (let y = 0; y < (dice.length - i); y++){
  //         if(dice[i].value !== dice[y].value){
  //           win=false;
  //           return;
  //         }
  //       }
  //     }
  //   }
  //   if (win === true){
  //     setTenzies(true);
  //     console.log("You won")
  //   }else{
  //     setTenzies(false)
  //   }
  // },[dice])

  // Declarative way
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You won!")
    }
  },[dice])


  function generateNewDie(){
    const die = {
      value:Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id:nanoid()
    }
    return die
  }

  function rollDice(){
    if(tenzies === true){
      setTenzies(false)
      setDice(allNewDice())
      return;
    }
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld ?
        die :
        generateNewDie()
      })
    })
  }

  function allNewDice(){
    const array=[]
    for(let i = 0; i<10;i++){
      const die = generateNewDie()
      array.push( die)
    }
    return array
  }

  function holdDice(id){
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }
  

  return (
    <main className="App">
      {tenzies && <Confetti width="1000px" height="500px"></Confetti> }
      <h1>Tenzies for bé Duyên</h1>
      <h3>{tenzies ? "You made it, Ty heo" : "Roll until all dice are the same. Click each die to freeze it as its current value between rools."} </h3>
      <div className='container'>
        {dice.map(die => <Die 
        value={die.value} 
        image={die.image}
        key={die.id}
        isHeld = {die.isHeld}
        id= {die.id}
        holdDice = {holdDice} /> )}
      </div>
      
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
     
     
    </main>
  );
}   

export default App;
