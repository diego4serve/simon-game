import { useEffect, useState } from 'react'
import './App.css'
import sounds from "./assets/sounds"
import AudioButton from './components/AudioButton'
import StrictModeButton from './components/StrictModeButton/StrictModeButton'

function App() {
  const [gameSequence, setGameSequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [stepCount, setStepCount] = useState(0)
  const [strictModeOn, setStrictModeOn] = useState(false)
  const [activeButton, setActiveButton] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState<string>()
  const [gameRunning, setGameRunning] = useState(false)

  const generateRandomButton = () => {
    return Math.floor(Math.random() * 4) + 1;
  };

  const startNewGame = () => {
    setGameRunning(true)
    setStepCount(1)
    setGameSequence([generateRandomButton()])
    setUserSequence([])
  }
  
  const handleStart = () => {
    startNewGame()
  }

  const addStep = () => {
    setStepCount((prevCount) => prevCount + 1);
    setGameSequence((prevSequence) => [...prevSequence, generateRandomButton()]);
  };

  const handlePlay = (id: number) => {
    const index = userSequence.length

    if (id === gameSequence[index]) {
      const newUserSequence = [...userSequence, id]
      setUserSequence(newUserSequence)

      if (newUserSequence.length === gameSequence.length) {
        if (gameSequence.length === 20) {
          setGameWon(true);
        } else {
          addStep();
          setUserSequence([]);
        }
      } 
    } else {
      setError('Wrong!!')
      setTimeout(() => setError(''), 500);
      if (strictModeOn) {
        startNewGame();
      } else {
        setUserSequence([]);
        playSequence()
      }
    }
  }
  
  const playSequence = () => {
    setTimeout(() => {
        gameSequence.forEach((id, i) => {
            setTimeout(() => {
              console.log('playing: ', id)
              setActiveButton(id);
              setTimeout(() => setActiveButton(0), 500);
            }, i * 1000);
        });
    }, 1000);
};

  useEffect(() => {
    if (stepCount > 0) {
      setTimeout(() => playSequence(), 500)
    }
  }, [stepCount])

  return (
    <>
      <h1 className='game-title'>Simon Game</h1>
      {gameWon && <h3 className='winner-label'>You Won!!!</h3>}
      {error && <h3 className='error-label'>{error}</h3>}
      <div id="game-container">
        <div id="display">{stepCount}</div>
        {[...Array(4)].map((_, i) => (
        <AudioButton 
          key={i} 
          id={i + 1}
          sound={sounds[`simonSound${i+1}`]} 
          onClick={handlePlay}
          active={activeButton === i + 1}
        />
      ))}
      <div id="button-container">
        <button id="restart" onClick={handleStart}>Start</button>
        <StrictModeButton gameRunning={gameRunning} strictModeOn={strictModeOn} onClick={setStrictModeOn} />
      </div>
    </div>
    </>
  )
}

export default App
