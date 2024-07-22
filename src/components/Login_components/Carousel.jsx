import { useState, useEffect } from 'react';
import imagen from '../../assets/img/hola.png';

function Carousel() {
    const gradient = 'linear-gradient(80deg, purple, #00FFA2)';
    const phrases = [
        { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela', image: 'image_url1' },
        { text: 'Education is not preparation for life; education is life itself.', author: 'John Dewey', image: 'image_url2' },
        { text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', author: 'Malcolm X', image: 'image_url3' },
        { text: 'Education is the movement from darkness to light.', author: 'Allan Bloom', image: 'image_url4' },
        { text: 'Education is the act of learning things that are not previously known.', author: 'Hermann Ebbinghaus', image: 'image_url5' },
        { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela', image: 'image_url6' },
        { text: 'Education is not preparation for life; education is life itself.', author: 'John Dewey', image: 'image_url7' },
        { text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', author: 'Malcolm X', image: 'image_url8' },
        { text: 'Education is the movement from darkness to light.', author: 'Allan Bloom', image: 'image_url9' },
        { text: 'Education is the act of learning things that are not previously known.', author: 'Hermann Ebbinghaus', image: 'image_url10' }
    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) =>
                prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Cambia la frase cada 3 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="w-full h-full rounded-r-3xl border hidden sm:block"
            style={{ backgroundImage: gradient }}
        >
            <div className="flex justify-center">
                <img className="h-80 sm:h-56" src={imagen} alt="Logo" />
            </div>

            <div>
                <p className="font-bold text-white text-3xl italic text-center sm:mt-20 mx-6">
                    "{phrases[currentPhraseIndex].text}" </p> 
                <p className='font-extrabold text-black text-right text-2xl sm:mt-20 mr-10'>{phrases[currentPhraseIndex].author}</p>
            </div>
        </div>
    );
}

export default Carousel;
