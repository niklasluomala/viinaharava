import * as React from "react"
import "./style.css"
import cn from 'classnames'

interface Props {
    value: GridCell
}

interface GridCell {
    isMine: boolean,
    isEmpty: boolean,
    n: number
}

function Cell({ value }: Props) {
    const getValue = () => {
        if (value.isMine) {
            return "💣"
        } else if (value.isEmpty) {
            return ""
        }
        
        return value.n
    }
    
    const className = cn('cell', {
        'is-mine': value.isMine,
        'is-empty': value.isEmpty
    })

    return (
        <div className={ className }>
          { getValue() }
        </div>
        )
    }
    
    export default Cell;
    