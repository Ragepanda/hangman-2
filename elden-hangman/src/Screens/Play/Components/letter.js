import React from 'react'
import './letter.scss'
import clickSound from '../../../Assets/sounds/ui-click.mp3'
import useSound from 'use-sound'

// eslint-disable-next-line react/prop-types
const Letter = ({ letter, handleGuess, disabled }) => {
  const [click] = useSound(clickSound, { volume: 0.3 }, [])
  return <button
    className='menu-button'
    key={letter}
    onMouseEnter={click}
    onClick={() => handleGuess(letter)}
    disabled={disabled}
  >
    {letter}
  </button>
}

export default Letter
