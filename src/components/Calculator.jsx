import React from 'react';
import { useState } from 'react';
import './Calculator.css'

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState("0");
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState("");

    const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8","9"];
    const operations = ["+", "-", "*", "/"]

    const handleClick = (val) => {
        setCurrentValue((prevValue) => {
            if (prevValue === "0") {
                return val;
            } else {
                return prevValue + val;
            }
        });
        setCompleteOperation((prevOperation) => prevOperation + val)
    };

    const handleOperation = (operation) => {
        setCompleteOperation(currentValue + " " + operation)
        setPendingOperation(operation);
        setPendingValue(currentValue);
        setCurrentValue("0")
    }

    const handleClear = () => {
        setCurrentValue("0")
        setPendingOperation(null)
        setPendingValue(null)
        setCompleteOperation("")
    }

    const handleCalculate = () => {
       if(!pendingOperation || !pendingValue) {
        return;
       } 

       const num1 = parseFloat(pendingValue)
       const num2 = parseFloat(currentValue)

       let results;

       switch (pendingOperation) {
        case "+":
            results = num1 + num2
            break;
        case "-":
            results = num1 - num2
            break;
        case "*":
            results = num1 * num2
            break;
        case "/":
            if (num2 !== 0) {
                results = num1 / num2
            } else {
                setCurrentValue("Error")
                setCompleteOperation("Error")
                setPendingOperation(null)
                setPendingValue(null)
                return;
            }
            break;
        default:
            break;
       }

       setCompleteOperation(
        pendingValue +
         "" +
         pendingOperation +
         " " +
         currentValue + 

         " = " +
         results 
       );
       setCurrentValue(results.toString());
       setPendingOperation(null)
       setPendingValue(null);

    }


  return (
    <>
        <h1 className='text'>Calculadora</h1>
        <div className="calculator">
            <div className="complete-operation">{completeOperation}</div>
            <div className="display">{currentValue}</div>
            <button className='buttonAC' onClick={handleClear}>AC</button>
            
            <div className="buttonsOperations">
                {operations.map((operation) => (
                    <button key={operation} onClick={() => handleOperation(operation)}>
                        {operation}
                        </button>
                ))}
            </div>
            
            <div className="buttonsNumbers">
                
                {keypadNumbers.map((num) => (
                    <button key={num} onClick={() => handleClick(num)}>
                        {num}
                    </button>
                ))}
            </div>
            <button className='calculate' onClick={handleCalculate}>=</button>

        </div>
    </>
    )
    }

export default Calculator
