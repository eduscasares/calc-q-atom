import React from 'react';
import './Calc.scss';

const Calc = ({ children }) => {
    return (
        <main>
            <div className="calculator">
                { children }
            </div>
        </main>
    );
}

export default Calc;