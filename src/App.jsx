import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './components/Game/Game.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Viinaharava 0.1</h1>
      <div>
        <Game />
      </div>
    </>
  )
}

export default App
