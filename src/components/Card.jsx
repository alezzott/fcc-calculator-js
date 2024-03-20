import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { HistoryDisplay } from './CalcHistory';
import { buttonsData } from '../data/buttons';
import { evaluate, sqrt } from 'mathjs';
import { Tooltip } from './Tooltitp';

export function Card() {
  const [input, setInput] = useState('0');
  const [calculatorData, setCalculatorData] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = () => {
    try {
      const total = evaluate(calculatorData);
      setInput(total.toString());
      setCalculatorData(total.toString());
      setHistory((prevHistory) => [...prevHistory, calculatorData + ' = ' + total]);
    } catch (error) {
      setInput('');
      setCalculatorData('');
    }
  };

  const handleClear = () => {
    setInput('0');
    setCalculatorData('');
  };

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === '0' && calculatorData === '0') {
        setCalculatorData(calculatorData);
      } else if (calculatorData === '0' && value !== '0' && value !== '.') {
        setInput(`${value}`);
        setCalculatorData(`${value}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);
        if (isLastCharOperator && value === '0') {
          setCalculatorData(calculatorData);
        } else {
          setInput((prevInput) => prevInput + value);
          setCalculatorData((prevData) => prevData + value);
        }
      }
    }
  };

  const dotOperator = () => {
    if (!input.includes('.')) {
      setInput((prevInput) => prevInput + '.');
      setCalculatorData((prevData) => prevData + '.');
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        beforeLastChat === '*' || beforeLastChat === '-' || beforeLastChat === '/' || beforeLastChat === '+';

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator = lastChat === '*' || lastChat === '-' || lastChat === '/' || lastChat === '+';

      if ((lastChatIsOperator && value !== '-') || (beforeLastChatIsOperator && lastChatIsOperator)) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 2)}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${value}`);
        }
      } else {
        setCalculatorData((prevData) => prevData + value);
      }
    }
  };

  const handlePercentage = () => {
    if (calculatorData.length) {
      const percent = evaluate(calculatorData + '/100');
      setInput(percent.toString());
      setCalculatorData(percent.toString());
    }
  };

  const handleSquareRoot = () => {
    if (calculatorData.length) {
      const root = sqrt(parseFloat(calculatorData));
      setInput(root.toString());
      setCalculatorData(root.toString());
    }
  };

  const handleInput = (value) => {
    switch (value) {
      case '=':
        handleSubmit();
        break;
      case 'C':
        handleClear();
        break;
      case '.':
        dotOperator(value);
        break;
      case '%':
        handlePercentage();
        break;
      case '√':
        handleSquareRoot();
        break;
      default:
        if (!isNaN(value) || value === '0') {
          handleNumbers(value);
        } else {
          handleOperators(value);
        }
        break;
    }
  };

  return (
    <section className=" max-lg:mb-16 max-lg:w-80 max-w-lg p-6 mt-10  m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-gray-70">
      <article id="display" className="w-full mb-2 p-6 bg-[#454545] rounded-lg text-2xl font-semibold text-right">
        {input}
      </article>
      <section className="grid grid-cols-4 gap-3 mt-10">
        <button
          id="clear"
          className="bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg col-span-2 w-auto"
          onClick={() => handleInput('C')}
        >
          <Tooltip text="Clear">C</Tooltip>
        </button>
        {buttonsData.map((button) => (
          <button
            key={button.id}
            id={button.id}
            className="bg-[#843dff] hover:bg-[#5a03d5] text-white font-semibold px-4 py-6 rounded-lg"
            onClick={() => handleInput(button.value)}
          >
            {button.label}
          </button>
        ))}
        <button
          onClick={() => handleInput('√')}
          className="bg-[#843dff] hover:bg-[#5a03d5] text-white font-semibold  rounded-lg"
        >
          <Tooltip text={'square root'}>√</Tooltip>
        </button>
        <button
          onClick={() => handleInput('%')}
          className="bg-[#843dff] hover:bg-[#5a03d5] text-white font-semibold px-4 py-6 rounded-lg"
        >
          <Tooltip text={'percentage'}>%</Tooltip>
        </button>
        <button
          onClick={toggleHistory}
          className="bg-[#843dff] hover:bg-[#5a03d5] text-white font-semibold items-center flex justify-center rounded-lg"
        >
          <Tooltip text={'Show History'}>
            <RxHamburgerMenu size={50} />
          </Tooltip>
        </button>
        <button
          id="equals"
          className="bg-green-500 hover:bg-green-700 text-white font-semibold p-4 rounded-lg col-span-4 text-4xl"
          onClick={() => handleInput('=')}
        >
          <Tooltip text={'Show Result'}>=</Tooltip>
        </button>
      </section>
      {showHistory && <HistoryDisplay history={history} />}
    </section>
  );
}
