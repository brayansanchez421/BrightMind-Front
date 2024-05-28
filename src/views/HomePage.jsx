import React from 'react';
import NavigationBar from '../components/Home/NavigationBar';
import QuoteCarousel from '../components/Home/QuoteCarousel';
import HoverCard from '../components/Home/HoverCard';
import ImageCarousel from '../components/Home/QuoteCarousel';  // Asegúrate de importar el componente correcto
import imgNode from '../assets/img/Logo_cards/Nodejs.png';
import imgJs from '../assets/img/Logo_cards/js.png';
import imgGit from '../assets/img/Logo_cards/github.png';
import imgReact from '../assets/img/Logo_cards/react.png';
import imgPython from '../assets/img/Logo_cards/python.png';
import imgMongo from '../assets/img/Logo_cards/mongo.png';
import imgExpress from '../assets/img/Logo_cards/express.png';

function HomePage() {
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

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen overflow-hidden">
            <NavigationBar />
            
            <QuoteCarousel phrases={phrases} />
            <div className="grid grid-cols-3 gap-2  w-11/12 mx-auto ">
                <HoverCard title="NodeJs" description="Node.js es un entorno de ejecución de JavaScript en el lado del servidor que utiliza un modelo asíncrono y dirigido por eventos. Es ideal para construir aplicaciones escalables en tiempo real." ruta={imgNode} />
                <HoverCard title="JavaScript" description="JavaScript es un lenguaje de programación utilizado principalmente en el desarrollo web. Es conocido por su versatilidad y se utiliza tanto en el lado del cliente como en el servidor." ruta={imgJs} />
                <HoverCard title="GitHub" description="GitHub es una plataforma de desarrollo colaborativo de software que utiliza el sistema de control de versiones Git. Es ampliamente utilizado para alojar proyectos de código abierto y colaborar en código." ruta={imgGit} />
                <HoverCard title="React" description="React es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas y de una sola página. Es mantenido por Facebook y una comunidad de desarrolladores." ruta={imgReact} />
                <HoverCard title="Python" description="Python es un lenguaje de programación de alto nivel conocido por su sintaxis clara y legible. Es ampliamente utilizado en desarrollo web, análisis de datos, inteligencia artificial y más." ruta={imgPython} />
                <HoverCard title="MongoDB" description="MongoDB es una base de datos NoSQL orientada a documentos que utiliza un modelo de datos flexible y escalable. Es popular en el desarrollo de aplicaciones web modernas." ruta={imgMongo} />
                <HoverCard title="Express" description="Express es un marco de aplicación web de back-end para Node.js, diseñado para crear aplicaciones web y APIs de manera sencilla y rápida. Es minimalista y flexible." ruta={imgExpress} />
            </div>
        </div>
    );
}

export default HomePage;
