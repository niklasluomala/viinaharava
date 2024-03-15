import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Game from './components/Game/Game';
import PlayerView from './components/PlayerView/PlayerView';
import ThanksMarkdown from './thanks.md';
import RequirementsMarkdown from './requirements.md';
import DrinksMarkdown from './drinks.md';
import GameSetupMarkdown from './game-setup.md';
import GameFlowMarkdown from './game-flow.md';
import WinConditionMarkdown from './win-condition.md';
import SpecialsMarkdown from './specials.md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';

function App() {
  const [thanks, setThanks] = useState('');
  const [requirements, setRequirements] = useState('');
  const [drinks, setDrinks] = useState('');
  const [gameSetup, setGameSetup] = useState('');
  const [gameFlow, setGameFlow] = useState('');
  const [winCondition, setWinCondition] = useState('');
  const [specials, setSpecials] = useState('');

  type Contributors = Map<string, string>;
  type Rules = Map<string, string>;

  const GAME_VER = 'Viinaharava 0.4';
  const CONTRIBUTORS: Contributors = new Map<string, string>([
    ['niklasluomala', 'https://github.com/niklasluomala'],
    ['Loimaranta', 'https://github.com/Loimaranta'],
    ['Jugebox', 'https://github.com/Jugebox'],
    ['kovipu', 'https://github.com/kovipu'],
  ]);
  const RULES: Rules = new Map<string, string>([
    ['Pelivälineet', requirements],
    ['Juomamäärät', drinks],
    ['Pelin valmistelu', gameSetup],
    ['Pelin kulku', gameFlow],
    ['Pelin päättyminen', winCondition],
    ['Erikoistilanteita', specials],
  ]);

  useEffect(() => {
    fetch(ThanksMarkdown)
      .then((response) => response.text())
      .then((text) => setThanks(text));
    fetch(RequirementsMarkdown)
      .then((response) => response.text())
      .then((text) => setRequirements(text));
    fetch(DrinksMarkdown)
      .then((response) => response.text())
      .then((text) => setDrinks(text));
    fetch(GameSetupMarkdown)
      .then((response) => response.text())
      .then((text) => setGameSetup(text));
    fetch(GameFlowMarkdown)
      .then((response) => response.text())
      .then((text) => setGameFlow(text));
    fetch(WinConditionMarkdown)
      .then((response) => response.text())
      .then((text) => setWinCondition(text));
    fetch(SpecialsMarkdown)
      .then((response) => response.text())
      .then((text) => setSpecials(text));
  }, []);

  return (
    <>
      <div>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Tabs defaultValue="rules">
            <TabsList className="w-full justify-between md:justify-center overflow-x-auto no-scrollbar">
              <TabsTrigger value="rules">Säännöt</TabsTrigger>
              <TabsTrigger value="playerView">Pelaajan näkymä</TabsTrigger>
              <TabsTrigger value="dealerView">Jakajan näkymä</TabsTrigger>
              <TabsTrigger value="thanks">Kiitokset</TabsTrigger>
            </TabsList>
            <TabsContent value="rules" className="container mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{GAME_VER}</CardTitle>
                  <CardDescription>
                    By
                    {[...CONTRIBUTORS].map(([key, value]) => {
                      return (
                        <Button
                          variant="link"
                          onClick={() => (window.location.href = value)}
                          key={key}
                        >
                          {key}
                        </Button>
                      );
                    })}
                    <br />
                    <div className="quote">
                      <p>
                        &quot;Pelkkä nimi ei välttämättä ole paras mahdollinen lähtökohta aloittaa
                        juomapelin suunnittelu.&quot;
                      </p>
                    </div>
                    <p>Albert Einstein kätellessään Abraham Lincolnia</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rules">
                    <Accordion type="multiple" defaultValue={[...RULES.keys()]}>
                      {[...RULES].map(([key, value]) => {
                        return (
                          <div key={key}>
                            <AccordionItem value={key}>
                              <AccordionTrigger>{key}</AccordionTrigger>
                              <AccordionContent>
                                <ReactMarkdown remarkPlugins={remarkGfm}>{value}</ReactMarkdown>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                        );
                      })}
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="playerView" className="container mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Pelaajan näkymä</CardTitle>
                  <CardDescription>
                    Tässä näkymässä pelaajat voivat syöttää koodin selkeyttämään peliä.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="game">
                    <PlayerView />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="dealerView" className="container mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Jakajan näkymä</CardTitle>
                  <CardDescription>
                    Tässä näkymässä jakaja voi generoida uuden pelialueen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="game">
                    <Game />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="thanks" className="container mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Kiitos</CardTitle>
                  <CardDescription>Kiitos testaajille</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="thanks">
                    <ReactMarkdown remarkPlugins={remarkGfm}>{thanks}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
