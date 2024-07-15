import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../assets/img/hola.png';

const phrases = [
    {
        text: 'Learning never exhausts the mind.',
        author: 'Leonardo da Vinci',
        imageUrl: 'https://th.bing.com/th/id/OIG1._bdTJRgcKBp2wYC3oen1?pid=ImgGn',
    },
    {
        text: 'Education is the most powerful weapon which you can use to change the world.',
        author: 'Nelson Mandela',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nelson_Mandela_1994_%282%29.jpg/1200px-Nelson_Mandela_1994_%282%29.jpg',
    },
    {
        text: 'The only place where success comes before work is in the dictionary.',
        author: 'Vidal Sassoon',
        imageUrl: 'https://cdijum.mx/wp-content/uploads/2018/01/sassoon-nyt.jpg',
    },
    {
        text: 'The mind that opens to a new idea never returns to its original size.',
        author: 'Albert Einstein',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
    },
    {
        text: 'The road to success and the road to failure are almost exactly the same.',
        author: 'Colin R. Davis',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Colin_Davis_%281967%29.jpg',
    },
    {
        text: 'The only source of knowledge is experience.',
        author: 'Albert Einstein',
        imageUrl: 'https://c.files.bbci.co.uk/assets/aabea4fb-7ebf-43e9-b431-b1480f3ca926',
    }
];

const WelcomePage = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [userActivated, setUserActivated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) =>
                prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        const activationTimeout = setTimeout(() => {
            setUserActivated(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(activationTimeout);
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 min-h-screen flex ">
            
            <div> <img className="w-44 mt-6 " src={imagen} alt="Logo" /></div>

            <div className="w-4/5 mt-32 md:ml-auto md:mr-auto">

                <div className="bg-gradient-to-r flex flex-col from-violet-500 to-fuchsia-400 py-2 rounded-lg shadow-2xl mt-6">

                    <div className='text-6xl mt-2 text-center mb-8 uppercase py-10 font-black text-white border-font'>Welcome to our educational platform! </div>
                    
                    <div className='text-5xl font-extrabold mb-12 text-center md:mr-20 md:ml-20 py-2 shadow-lg shadow-red-100 text-black'>
                        "{phrases[currentPhraseIndex].text}" 
                        <div className="flex items-center  justify-center mt-4">
                        <img className="h-72 mr-4 rounded-xl mt-4 mb-4" src={phrases[currentPhraseIndex].imageUrl} alt="Phrase Image" /></div> 
                        <div> <p className="text-2xl text-gray-700 text-right md:mr-10">{phrases[currentPhraseIndex].author}</p></div>
                    </div>
                    {userActivated && (
                        <h2 className="text-3xl mb-4 font-extrabold text-emerald-200 flex justify-center">Usuario activado exitosamente</h2>
                    )}
                    <div className="flex justify-center"> {/* Contenedor flex para centrar */}
                        <button onClick={() => navigate('/')} className="py-6 text-xl md:mb-10 bg-green-500 w-28 text-white rounded-lg shadow-md  hover:bg-lime-500 transition-colors" >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
