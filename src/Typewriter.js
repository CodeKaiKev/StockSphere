import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay, onType, key }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset state when key prop changes
    setCurrentText('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [key]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        setIsTyping(true);
        if (onType) {
          onType(currentText + text[currentIndex]);
        }
      }, delay);
  
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, delay, text, onType]);

  return (
    <span>
      {currentText}
      <span className={`cursor ${isTyping ? 'typing' : 'blinking'}`}>|</span>
    </span>
  );
};

export default Typewriter;