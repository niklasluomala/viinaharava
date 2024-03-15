import * as React from 'react';
import { SliderProps } from '@radix-ui/react-slider';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

import { GameContext } from '@/GameContext';

interface MinesSelectorProps {
  defaultValue: SliderProps['defaultValue'];
}

export function MinesSelector({ defaultValue }: MinesSelectorProps) {
  const gameContext = React.useContext(GameContext);
  const [value, setValue] = React.useState(gameContext.mines);

  React.useEffect(() => {
    setValue(gameContext.mines);
  }, [gameContext.mines]);

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="mines">Miinat</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {value}
          </span>
        </div>
        <Slider
          id="minesSlider"
          min={6}
          max={9}
          defaultValue={defaultValue}
          step={1}
          onValueChange={(e) => {
            setValue(e[0]);
            gameContext.mines = e[0];
            console.log(gameContext);
          }}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Miinat"
        />
      </div>
    </div>
  );
}
