import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Game from './components/Game/Game.jsx';
import RulesMarkdown from './rules.md';
import ThanksMarkdown from './thanks.md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';

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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Tabs defaultValue="rules">
            <TabsList className="w-full">
              <TabsTrigger value="rules">Säännöt</TabsTrigger>
              <TabsTrigger value="generator">Generaattori</TabsTrigger>
              <TabsTrigger value="thanks">Kiitokset</TabsTrigger>
            </TabsList>
            <TabsContent value="rules" className="container mx-auto">
              <Card className="">
                <CardHeader>
                  <CardTitle>Viinaharava 0.3</CardTitle>
                  <CardDescription>
                    By
                    <Button
                      variant="link"
                      onClick={() =>
                        (window.location.href = 'https://www.github.com/niklasluomala')
                      }
                    >
                      niklasluomala
                    </Button>{' '}
                    /
                    <Button
                      variant="link"
                      onClick={() => (window.location.href = 'https://www.github.com/Loimaranta')}
                    >
                      Loimaranta
                    </Button>{' '}
                    /
                    <Button
                      variant="link"
                      onClick={() => (window.location.href = 'https://www.github.com/Jugebox')}
                    >
                      Jugebox
                    </Button>{' '}
                    /
                    <Button
                      variant="link"
                      onClick={() => (window.location.href = 'https://www.github.com/kovipu')}
                    >
                      kovipu
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rules">
                    <ReactMarkdown remarkPlugins={remarkGfm}>{rules}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="generator" className="container mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Generaattori</CardTitle>
                  <CardDescription>Jakajan näkymä</CardDescription>
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
