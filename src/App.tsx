import { useState, useEffect } from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import Game from './components/Game/Game.jsx';
import RulesMarkdown from './rules.md';
import ThanksMarkdown from './thanks.md';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Markdown from 'mui-markdown';

function App() {
  const [rules, setRules] = useState('');
  const [thanks, setThanks] = useState('');
  const [value, setValue] = useState('1');

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="Säännöt" value="1" />
                <Tab label="Generaattori" value="2" />
                <Tab label="Kiitokset" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Markdown>{rules}</Markdown>
            </TabPanel>
            <TabPanel value="2">
              <Game />
            </TabPanel>
            <TabPanel value="3">
              <Markdown>{thanks}</Markdown>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}

export default App;
