import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  
  useEffect(() => {
    /** controls watch over when the game is over 
     *  all dice are same value and all dice are held
     *  if true -> set change of 'tenzies' state to true
     */
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function generateNewDie() {
      /** helper function to create new single dice object
       * 
       */
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
    /**
     * Creates a new set of 10 dice
     */
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  function rollDice() {
    /**
     * rolls all dice where die.isHeld === false
     * Also checks for game completion
     * 
     */
      if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
            // create new dice where die.isHeld === false, keep die if die.isHeld === true
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      } else {
          setTenzies(false)
          setDice(allNewDice())
      }
  }
  
  function holdDice(id) {
    /**
     * change the element of the dice array where the id matches
     * if element matches to the id, return new die with changed die.isHeld
     * if element does NOT match, return the same die
     */
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      // creates the dice elements to populate the page
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  
  return (
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  )
}