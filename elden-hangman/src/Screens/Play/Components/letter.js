import React from 'react'
import './letter.scss'

// eslint-disable-next-line react/prop-types
const Letter = ({ letter, handleGuess, disabled }) => {
  return <button
    className='menu-button'
    key={letter}
    onClick={() => handleGuess(letter)}
    disabled={disabled}
  >
    {letter}
  </button>
}

export default Letter
