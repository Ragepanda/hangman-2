import React, { useState, useEffect, useCallback } from 'react'
import './hangman.scss'
import Letter from './letter'
import Item from './item'
import Banner from './banner'
import clickSound from '../../../Assets/sounds/ui-click.mp3'
import useSound from 'use-sound'

// eslint-disable-next-line react/prop-types
const Hangman = ({ wins, setWins }) => {
  const [word, setWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [remainingAttempts, setRemainingAttempts] = useState(6)
  const [gameState, setGameState] = useState('playing') // playing, won, lost
  const [guessedBosses, setGuessedBosses] = useState([])

  const [click] = useSound(clickSound, { volume: 1.5 }, [])

  // Words for the game
  const words = [
    'Margit the Fell Omen',
    'Godrick the Grafted',
    'Red Wolf of Radagon',
    'Rennala, Queen of the Full Moon',
    'Leonine Misbegotten',
    'Ancestor Spirit',
    'Starscourge Radahn',
    'Magma Wyrm Makar',
    'Mimic Tear',
    'Royal Knight Loretta',
    'Regal Ancestor Spirit',
    'Dragonkin Soldier of Nokstella',
    'Valiant Gargoyles',
    'Astel, Naturalborn of the Void',
    'Godskin Noble',
    'Rykard, Lord of Blasphemy',
    'Elemer of the Briar',
    'Godfrey, First Elden Lord',
    'Morgott the Omen King',
    'Mohg, the Omen',
    'Commander Niall',
    'Fire Giant',
    'Loretta, Knight of the Haligtree',
    'Malenia, Blade of Miquella',
    'Godskin Duo',
    'Dragonlord Placidusax',
    'Maliketh, the Black Blade',
    'Lichdragon Fortissax',
    'Mohg, Lord of Blood',
    'Hoarah Loux, Warrior'
  ]

  // Pick a random word from the list
  const getRandomWord = () => {
    let word = ''
    while (word === '') {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      if (!guessedBosses.includes(randomWord)) { word = randomWord }
    }
    return words[Math.floor(Math.random() * words.length)]
  }

  // Initialize a new game
  const initializeGame = () => {
    if (gameState === 'won') { setWins(wins + 1) }
    if (gameState === 'lost' && wins > 0) { setWins(wins - 1) }
    setWord(getRandomWord())
    setGuessedLetters([' ', ','])
    setRemainingAttempts(6)
    setGameState('playing')
  }

  const handleKeyPress = useCallback((key) => {
    if (
      key.key.match(/[a-zA-Z]/i) &&
      key.key.length === 1 &&
      gameState === 'playing' &&
      !isLetterAlreadyGuessed(key.key.toUpperCase())
    ) {
      click()
      handleGuess(key.key.toUpperCase())
    }

    if (key.key === 'Enter' && gameState !== 'playing') {
      click()
      initializeGame()
    }
  })

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [handleKeyPress])

  // Check if a letter has already been guessed
  const isLetterAlreadyGuessed = (letter) => {
    return guessedLetters.includes(letter)
  }

  // Check if the guessed letter is in the word
  const isLetterInWord = (letter) => {
    if (typeof word === 'string') {
      return (
        word.includes(letter.toUpperCase()) ||
        word.includes(letter.toLowerCase())
      )
    } else {
      return false
    }
  }

  // Handle user input
  const handleGuess = (letter) => {
    if (gameState !== 'playing' || isLetterAlreadyGuessed(letter)) {
      return
    }

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!isLetterInWord(letter)) {
      setRemainingAttempts(remainingAttempts - 1)
    }

    // Check if the game is won
    const wordLetters = word.split('')
    const guessedWord = wordLetters.every((letter) =>
      newGuessedLetters.includes(letter.toUpperCase())
    )
    if (guessedWord) {
      setGameState('transition')
      setTimeout(() => {
        setGuessedBosses([...guessedBosses, word])
        setGameState('won')
      }, 1500)
    }

    // Check if the game is lost
    if (remainingAttempts === 1) {
      setGameState('lost')
    }
  }

  // Render the word with guessed letters

  const renderWord = useCallback(() => {
    let renderedWord = ''
    for (let i = 0; i < word.length; i++) {
      if (guessedLetters.includes(word[i].toUpperCase())) {
        renderedWord += `${word[i]} `
      } else renderedWord += '_ '
    }
    return renderedWord
  }, [guessedLetters])

  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className="hangman-game">
      {/* <h1>Elden Ring Hangman</h1> */}
      {(gameState === 'playing' || gameState === 'transition') && (
        <>
          <div className="hangman-text">
            <p className={gameState === 'transition' ? 'hangman-text-transition' : null}>{renderWord()}</p>
          </div>

          <div className="hangman-button-container">
            {Array.from(Array(26), (_, i) =>
              String.fromCharCode('A'.charCodeAt(0) + i)
            ).map((letter) => (
              <Letter
                key={letter}
                letter={letter}
                disabled={isLetterAlreadyGuessed(letter)}
                handleGuess={handleGuess}
              />
            ))}
          </div>
          <div className="hangman-status">
            <Item count={remainingAttempts} isFlask={true} />

            <Item count={wins} isFlask={false} />
          </div>
        </>
      )}
      {gameState === 'won' && <Banner isWin={true} />}
      {gameState === 'lost' && <div><Banner isWin={false} /> <h2>The word was: {word}</h2></div>}
      {(gameState === 'lost' || gameState === 'won') && <Letter key={'restart-game-button'} disabled={false} handleGuess={initializeGame} letter={'Next Boss'}/>}
    </div>
  )
}

export default Hangman
