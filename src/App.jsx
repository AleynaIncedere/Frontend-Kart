import { useState } from 'react';
import './styles.css';
import Header from './components/Header';
import FrontMessage from './components/FrontMessage';
import InnerMessage from './components/InnerMessage';

export default function App() {
  const [cardOpen, setCardOpen] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setInitialMouseX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    
    if (cardOpen) {
      setCardOpen(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    const currentMouseX = e.clientX;
    const isMovingLeft = initialMouseX - currentMouseX > 50;

    if (isMovingLeft && !cardOpen) {
      setCardOpen(true);
    } else if (cardOpen && currentMouseX > initialMouseX) {
      setCardOpen(false);
    }
  };

  return (
    <div className='wrapper'>
      <Header />
      <div className='card'>
        <InnerMessage />
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`cover ${cardOpen ? 'open' : ''}`}
        >
          <FrontMessage />
          <img src='./images/forLoop.png' alt="For Loop" />
        </div>
      </div>
    </div>
  );
}
