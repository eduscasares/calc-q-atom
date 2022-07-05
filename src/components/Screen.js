import React from 'react'
import { Textfit } from "react-textfit";
import './Screen.scss'

const Screen = ({ value }) => {
    return (
        <Textfit className='screen' mode='single' max={32}>
            {value}
        </Textfit>
    )
}

export default Screen;