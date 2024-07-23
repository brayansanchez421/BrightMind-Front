import React, { useState, useEffect } from "react";
import imagen from "../../assets/img/hola.png";

function Carousel() {
  const gradient = "linear-gradient(80deg, purple, #00FFA2)";
  const phrases = [
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela", image: "image_url1" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey", image: "image_url2" },
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X", image: "image_url3" },
    { text: "Education is the movement from darkness to light.", author: "Allan Bloom", image: "image_url4" },
    { text: "Education is the act of learning things that are not previously known.", author: "Hermann Ebbinghaus", image: "image_url5" },
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) =>
        prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex sm:w-1/2 sm:h-screen bg-gradient-to-r from-purple-600 to-emerald-500 border border-black items-center justify-center">
      <div className="text-center text-white">
        <img className="h-56 mx-auto mb-4" src={imagen} alt="Logo" />
        <p className="text-3xl italic mb-2 mt-10">"{phrases[currentPhraseIndex].text}"</p>
        <p className="text-2xl font-bold mt-20 text-black">- {phrases[currentPhraseIndex].author}</p>
      </div>
    </div>
  );
}

export default Carousel;
