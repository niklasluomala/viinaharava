import { useState, useEffect } from 'react'
import Board from "../Board/Board.tsx";

import "./style.css";

function Game() {
    const [height, setHeight] = useState(6)
    const [width, setWidth] = useState(6)
    const [minesCount, setMinesCount] = useState(8)
    const [grid, setGrid] = useState([])
    const [cards, setCards] = useState([])
    const [minesCards, setMinesCards] = useState([])
    const [ones, setOnes] = useState([])
    const [twos, setTwos] = useState([])
    const [threes, setThrees] = useState([])
    const [fours, setFours] = useState([])
    const [fives, setFives] = useState([])
    const [sixes, setSixes] = useState([])
    const [sevens, setSevens] = useState([])
    const [eights, setEights] = useState([])
    const [empties, setEmpties] = useState([])

    const createNewBoard = () => {
        let board = []
        let minesArray = getRandomMines()

        for (let i = 0; i < width; ++i) {
            board.push([])
            for (let j = 0; j < height; ++j) {
                const gridCell = new GridCell(i, j, minesArray.includes(i * height + j))
                addGridCell(board, gridCell)
            }
        }

        return board
    }

    const cardifyGrid = (board, minesCards, ones, twos, threes, fours, fives, sixes, sevens, eights, empties) => {
        for (let row of board) {
            for (let gridCell of row) {
                let card = getCardForCell(gridCell, minesCards, ones, twos, threes, fours, fives, sixes, sevens, eights, empties)
                gridCell.card = card
            }
        }
    }

    const getNewDeck = () => {
       
        // spades, clubs, diamonds, hearts
        const suites = ["♠️", "♣️", "♦️", "♥️"]

        // card values from A to King
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

        // using 2 decks by default
        const decks = 2;

        let deck = []

        for (let value of values) {
            for (let suite of suites) {
                for (let i = 0; i < decks; i++) {
                    deck.push("".concat(value, suite))
                }
            }
        }

        return deck
    }

    const determineCardsForGrid = (board, cards, minesCards, ones, twos, threes, fours, fives, sixes, sevens, eights, empties) => {
        board.map(row => {
            row.map(cell => {
                if (cell.isMine) {
                    minesCards.push(cards.splice(cards.findIndex(card => card.match(/[(9)(10)]/g)), 1))
                } else if (cell.n === 1) {
                    ones.push(cards.splice(cards.findIndex(card => card.match(/[AJ]/g)), 1))
                } else if (cell.n === 2) {
                    twos.push(cards.splice(cards.findIndex(card => card.match(/[2Q]/g)), 1))
                } else if (cell.n === 3) {
                    threes.push(cards.splice(cards.findIndex(card => card.match(/[3K]/g)), 1))
                } else if (cell.n === 4) {
                    fours.push(cards.splice(cards.findIndex(card => card.match(/[4]/g)), 1))
                } else if (cell.n === 5) {
                    fives.push(cards.splice(cards.findIndex(card => card.match(/[5]/g)), 1))
                } else if (cell.n === 6) {
                    sixes.push(cards.splice(cards.findIndex(card => card.match(/[6]/g)), 1))
                } else if (cell.n === 7) {
                    sevens.push(cards.splice(cards.findIndex(card => card.match(/[7]/g)), 1))
                } else if (cell.n === 8) {
                    eights.push(cards.splice(cards.findIndex(card => card.match(/[8]/g)), 1))
                } else if (cell.n === 0 && !cell.isMine) {
                    empties.push(cards.splice(cards.findIndex(card => card.match(/[7-8]/g)), 1))
                }
            })
        })
    }

    const getRandomMines = () => {
        const minesArray = []
        const limit = width * height
        const minesPool = [...Array(limit).keys()]

        for (let i = 0; i < minesCount; ++i) {
            const n = Math.floor(Math.random() * minesPool.length)
            minesArray.push(...minesPool.splice(n, 1))
        }

        return minesArray
    }

    const addGridCell = (grid, gridCell) => {
        const y = grid.length - 1
        const x = grid[y].length
        const lastGridCell = gridCell
        const neighbours = getNeighbours(grid, y, x)

        for (let neighbourGridCell of neighbours) {
            if (lastGridCell.isMine) neighbourGridCell.n += 1
            else if (neighbourGridCell.isMine) lastGridCell.n += 1
        }

        grid[y].push(gridCell)
    }

    const getNeighbours = (grid, y, x) => {
        const neighbours = []
        const currentRow = grid[y]
        const prevRow = grid[y - 1]
        const nextRow = grid[y + 1]

        if (currentRow[x - 1]) neighbours.push(currentRow[x - 1]);
        if (currentRow[x + 1]) neighbours.push(currentRow[x + 1]);
        if (prevRow) {
            if (prevRow[x - 1]) neighbours.push(prevRow[x - 1]);
            if (prevRow[x]) neighbours.push(prevRow[x]);
            if (prevRow[x + 1]) neighbours.push(prevRow[x + 1]);
        }
        if (nextRow) {
            if (nextRow[x - 1]) neighbours.push(nextRow[x - 1]);
            if (nextRow[x]) neighbours.push(nextRow[x]);
            if (nextRow[x + 1]) neighbours.push(nextRow[x + 1]);
        }

        return neighbours;
    }

    const getCardForCell = (cell, minesCards, ones, twos, threes, fours, fives, sixes, sevens, eights, empties) => {
        let card = ""
        if (cell.isMine) {
            card = minesCards.shift()
            minesCards.push(card)
        }
        else if (cell.n === 1) {
            card = ones.shift()
            ones.push(card)
        } else if (cell.n === 2) {
            card = twos.shift()
            twos.push(card)
        } else if (cell.n === 3) {
            card = threes.shift();
            threes.push(card);
        } else if (cell.n === 4) {
            card = fours.shift();
            fours.push(card);
        } else if (cell.n === 5) {
            card = fives.shift();
            fives.push(card);
        } else if (cell.n === 6) {
            card = sixes.shift();
            sixes.push(card);
        } else if (cell.n === 7) {
            card = sevens.shift();
            sevens.push(card);
        } else if (cell.n === 8) { 
            card = eights.shift();
            eights.push(card);
        } else if (cell.n === 0 && !cell.isMine) {
            // check if card is already used
            let cardIsUsed = false;
            do {
                cardIsUsed = false;
                card = empties.shift();
                if (ones.find(one => one == card)) {
                    cardIsUsed = true;
                } else if (twos.find(two => two == card)) {
                    cardIsUsed = true;
                } else if (threes.find(three => three == card)) {
                    cardIsUsed = true;
                } else if (fours.find(four => four == card)) {
                    cardIsUsed = true;
                } else if (fives.find(five => five == card)) {
                    cardIsUsed = true;
                } else if (sixes.find(six => six == card)) {
                    cardIsUsed = true;
                } else if (sevens.find(seven => seven == card)) {
                    cardIsUsed = true;
                } else if (eights.find(eight => eight == card)) {
                    cardIsUsed = true;
                }      
            } while (cardIsUsed)
            empties.push(card);
        }
        return card;
      }

    const createNewGame = () => {
        let board = createNewBoard()
        let deck = getNewDeck()
        let minesDeck = []
        let onesDeck = []
        let twosDeck = []
        let threesDeck = []
        let foursDeck = []
        let fivesDeck = []
        let sixesDeck = []
        let sevensDeck = []
        let eightsDeck = []
        let emptiesDeck = []

        determineCardsForGrid(board, deck, minesDeck, onesDeck, twosDeck, threesDeck, foursDeck, fivesDeck, sixesDeck,
            sevensDeck, eightsDeck, emptiesDeck)
        cardifyGrid(board, minesDeck, onesDeck, twosDeck, threesDeck, foursDeck, fivesDeck, sixesDeck,
            sevensDeck, eightsDeck, emptiesDeck)
        setGrid(board)
        setCards(deck)
        setMinesCards(minesDeck)
        setOnes(onesDeck)
        setTwos(twosDeck)
        setThrees(threesDeck)
        setFours(foursDeck)
        setFives(fivesDeck)
        setSixes(sixesDeck)
        setSevens(sevensDeck)
        setEights(eightsDeck)
        setEmpties(emptiesDeck)
    }  

    useEffect(() => {
        createNewGame()
    }, [])

    return (
    <div className="game">
    <div className="control-buttons">
    <button onClick={() => createNewGame()}>Generoi</button>
    </div>
        <br />
        <Board
            grid={grid}
            cards={cards}
            minesCards={minesCards}
            ones={ones}
            twos={twos}
            threes={threes}
            fours={fours}
            fives={fives}
            sixes={sixes}
            sevens={sevens}
            eights={eights}
            empties={empties}
        />
        </div>
    )
}

class GridCell {
    constructor (y, x, isMine, card) {
        this.x = x
        this.y = y
        this.card = card
        this.n = 0
        this.isMine = isMine
    }
    get isEmpty() {
        return this.n === 0 && !this.isMine
    }
}
    
export default Game;