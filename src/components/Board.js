import React from 'react'
import './Board.scss'

const Board = ({ children }) => {
    return (
        <div className="board">
            {children}
        </div>
    )
}

export default Board;