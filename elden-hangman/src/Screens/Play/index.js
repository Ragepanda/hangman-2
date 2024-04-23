import React, { useState, useEffect } from 'react'
import Hangman from './Components/hangman'

const Play = () => {
  const [wins, setWins] = useState(0)
  useEffect(() => {
    console.log(wins)
  }, [wins])
  return (
    <div
      className={`hangman-page background-img-${wins}`}
    >
      <Hangman wins={wins} setWins={setWins} />
    </div>
  )
}

export default Play
