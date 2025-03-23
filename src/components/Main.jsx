import { useState } from "react";
import Die from "./Die"
import GameOver from "./GameOver";
export default function Main() {

    const [arrayofDie, setArrayOfDie] = useState(generateAllNewDice()); 
    const [gameOver, setGameOver] = useState(false);
    const [currentGameNumber, setCurrentGameNumber] = useState(null);

    function generateAllNewDice() {
        let numbersArray = []
        for (let i = 0; i < 10; i++) {
            let newDice = {key: i+1, id:i+1, value: '', isHeld: false};
            let x = Math.floor(Math.random() * 6) + 1;
            newDice.value = x;    
            numbersArray.push(newDice);
        }
        return numbersArray;
    }

    const dieElements = arrayofDie.map((die) => {
        return <Die key={die.key} 
        id={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        toggleHeld={toggleHeld}
        />
    })

    function startNewGame() {
        setGameOver(false);
        setArrayOfDie(generateAllNewDice())
    }

    function rollDice() {
        setArrayOfDie((prev) => {
            const newDice = prev.map((die) => {
                return {
                    ...die,
                    value: die.isHeld? die.value : Math.floor(Math.random() * 6) +1,
                }
            })
            checkGameOver(newDice)
            return newDice
        })
    }

    function checkGameOver(updatedDice) {
        const allHeld = updatedDice.every((die) => {
            return die.isHeld === true;
        })
       setGameOver(allHeld);
    }

    function toggleHeld(id) {
      updateCurrentGameNumber(id);

      setArrayOfDie((prev) => {
        const newDice = prev.map((die) => {
            return die.id === id ?
            {...die, isHeld: !die.isHeld} : die
        })
        checkGameOver(newDice)
       return newDice
      })
      
    }

    function updateCurrentGameNumber(id) {
        const result = arrayofDie.filter((die) => {
            return die.id === id;
          })[0].value;
          setCurrentGameNumber(result);
         
    }

    
    return (
        <>
            <main className="main">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click on each die to freeze its current value between rolls</p>
                {!gameOver ? <div className="die-container">
                    {dieElements}
                </div> : <GameOver /> }
                {!gameOver && <button 
                onClick={rollDice}
                className="roll-dice-button">Roll Dice</button>}
                {gameOver && <button 
                onClick={startNewGame}
                className="start-again-button">Start New Game</button>}
            </main>
        </>
    )
}