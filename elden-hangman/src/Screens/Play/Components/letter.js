import React from 'react'

// eslint-disable-next-line react/prop-types
const Letter = ({ letter, handleGuess, disabled }) => {
  return <button
    key={letter}
    onClick={() => handleGuess(letter)}
    disabled={disabled}
  >
    {letter}
  </button>
}

export default Letter
