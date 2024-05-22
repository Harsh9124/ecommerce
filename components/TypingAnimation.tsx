"use client";
import { useEffect, useState } from 'react';

const TypingAnimation = () => {
  const texts = [
    "T-Shirt Collection",
    "Shirt Collection",
    "Shoe Collection"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className=" typing-container">
      {texts.map((text, index) => (
        <span
          key={index}
          className={`${index === currentIndex ? 'block' : 'hidden'} animate-typing`}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default TypingAnimation;
