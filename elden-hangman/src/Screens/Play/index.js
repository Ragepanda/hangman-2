import React, { useState, useEffect } from 'react'
import Hangman from './Components/hangman'

const Play = () => {
  const [wins, setWins] = useState(0)
  const [guesses, setGuesses] = useState(5)
  useEffect(() => {
    console.log(wins)
    console.log(guesses)
  }, [wins, guesses])
  return (
    <div
      className={`hangman-page background-img-${wins}`}
    >
      <div className='hangman-wrapper'>
      <Hangman wins={wins} setWins={setWins} guesses={guesses} setGuesses={setGuesses} />
    </div>
    </div>
  )
}

export default Play
