import { useState, useEffect } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Game from './components/Game/Game.jsx';
import RulesMarkdown from './rules.md';
import ThanksMarkdown from './thanks.md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

function App() {
  const [rules, setRules] = useState('');
  const [thanks, setThanks] = useState('');

  useEffect(() => {
    fetch(RulesMarkdown)
      .then((response) => response.text())
      .then((text) => setRules(text));
    fetch(ThanksMarkdown)
      .then((response) => response.text())
      .then((text) => setThanks(text));
  }, []);

  return (
    <>
      <div>
        <Tabs>
          <TabList>
            <Tab>Säännöt</Tab>
            <Tab>Generaattori</Tab>
            <Tab>Kiitokset</Tab>
          </TabList>
          <TabPanel>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{rules}</ReactMarkdown>
          </TabPanel>
          <TabPanel>
            <Game />
          </TabPanel>
          <TabPanel>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{thanks}</ReactMarkdown>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
