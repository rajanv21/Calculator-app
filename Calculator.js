

import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState('');
    const [operator, setOperator] = useState('');
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const handleDigitClick = (digit) => {
        if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const handleOperatorClick = (nextOperator) => {
        if (firstOperand === '') {
            setFirstOperand(display);
        } else if (operator) {
            const result = operate(firstOperand, display, operator);
            setDisplay(String(result));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const handleEqualClick = () => {
        const result = operate(firstOperand, display, operator);
        setDisplay(String(result));
        setFirstOperand('');
        setOperator('');
        setWaitingForSecondOperand(false);
    };

    const handleClearClick = () => {
        setDisplay('0');
        setFirstOperand('');
        setOperator('');
        setWaitingForSecondOperand(false);
    };

    const handleDecimalClick = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const operate = (num1, num2, op) => {
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);

        switch (op) {
            case '+':
                return number1 + number2;
            case '-':
                return number1 - number2;
            case '*':
                return number1 * number2;
            case '/':
                return number1 / number2;
            default:
                return number2;
        }
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="buttons">
                <button onClick={() => handleDigitClick(7)}>7</button>
                <button onClick={() => handleDigitClick(8)}>8</button>
                <button onClick={() => handleDigitClick(9)}>9</button>
                <button onClick={() => handleOperatorClick('/')}>/</button>
                <button onClick={() => handleDigitClick(4)}>4</button>
                <button onClick={() => handleDigitClick(5)}>5</button>
                <button onClick={() => handleDigitClick(6)}>6</button>
                <button onClick={() => handleOperatorClick('*')}>*</button>
                <button onClick={() => handleDigitClick(1)}>1</button>
                <button onClick={() => handleDigitClick(2)}>2</button>
                <button onClick={() => handleDigitClick(3)}>3</button>
                <button onClick={() => handleOperatorClick('-')}>-</button>
                <button onClick={() => handleDigitClick(0)}>0</button>
                <button onClick={handleDecimalClick}>.</button>
                <button onClick={handleEqualClick}>=</button>
                <button onClick={() => handleOperatorClick('+')}>+</button>
                <button onClick={handleClearClick}>C</button>
            </div>
        </div>
    );
};

export default Calculator;
