import { useState } from "react";
import Die from "./Die"
import GameOver from "./GameOver";
import Confetti from 'react-confetti'

export default function Main() {

    const [arrayofDie, setArrayOfDie] = useState(() => generateAllNewDice()); 
    let gameWon = false;

    if (
        arrayofDie.every(die => die.isHeld) && arrayofDie.every(die => die.value === arrayofDie[0].value)) {
            gameWon = true;
    }

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
        gameWon = false;
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
            return newDice
        })
    }


    function toggleHeld(id) {

      setArrayOfDie((prev) => {
        const newDice = prev.map((die) => {
            return die.id === id ?
            {...die, isHeld: !die.isHeld} : die
        })
       return newDice
      })
      
    }


    
    return (
        <>
            <main className="main">
                {gameWon && <Confetti />}
                {!gameWon && <h1 className="app-title">Tenzies</h1> }
                {!gameWon && <p className="app-description">Roll until all dice are the same. Click on each die to freeze its current value between rolls</p>}
                {!gameWon ? <div className="die-container">
                    {dieElements}
                </div> : <GameOver /> }
                {!gameWon && <button 
                onClick={rollDice}
                className="roll-dice-button">Roll Dice</button>}
                {gameWon && <button 
                onClick={startNewGame}
                className="start-again-button">Start New Game</button>}
            </main>
        </>
    )
}