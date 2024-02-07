import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './components/Game/Game.jsx'
import RulesMarkdown from './rules.md'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function App() {
  const [rules, setRules] = useState("")

  useEffect(() => {
    fetch(RulesMarkdown)
      .then(response => response.text())
      .then(text => setRules(text))
  }, [])

  return (
    <>
      <div>
        <ReactMarkdown remarkPlugins={remarkGfm} children={rules}></ReactMarkdown>
        <Game />
      </div>
    </>
  )
}

export default App