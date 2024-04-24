import React, { useEffect } from 'react'
import './banner.scss'
import useSound from 'use-sound'
import enemyFelledSound from '../../../Assets/sounds/enemy-felled.mp3'
import youDiedSound from '../../../Assets/sounds/you-died.mp3'

// eslint-disable-next-line react/prop-types
const Banner = ({ isWin }) => {
  const [enemyFelled] = useSound(enemyFelledSound, { volume: 0.2 }, [])
  const [youDied] = useSound(youDiedSound, { volume: 0.5 }, [])
  useEffect(() => {
    if (isWin === true) { enemyFelled() } else { youDied() }
  }, [enemyFelled])
  return <div className={`victory-banner ${isWin === false ? 'you-died' : ''}`}>{isWin === true ? 'ENEMY FELLED' : 'YOU DIED'}</div>
}

export default Banner
