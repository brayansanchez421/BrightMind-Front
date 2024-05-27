import React from 'react';
import NavigationBar from './NavigationBar';

const CoursesComponent = () => {
    
    const courses = [
        {
            name: 'Curso de JavaScript',
            category: 'Programación ikasdnasd',
            description: 'Aprende a crear sitios web profesionales utilizando las últimas tecnologías web.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0_ijMX_4xf0rGse2D334wtm-LcqQ_lrsFQ&s'
        },
        {
            name: 'Curso de Marketing Digital',
            category: 'Marketing',
            description: 'Domina las estrategias de marketing en línea y promociona tus productos o servicios.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJo5M-5n9zg1x_i99RAIi_oFfqek8hTCETnsGwF3gVQ&s'
        },
        {
            name: 'Curso de Fotografía',
            category: 'Arte',
            description: 'Aprende los fundamentos de la fotografía y mejora tus habilidades de composición y edición.',
            image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/nodejs-frameworks.png'
        },
        {
            name: 'Curso de Inglés Avanzado',
            category: 'Idiomas',
            description: 'Mejora tu fluidez en inglés y alcanza un nivel avanzado de comprensión y expresión oral ajsajsad .',
            image: 'https://www.php.net/images/meta-image.png'
        },
        {
            name: 'Curso de Cocina Gourmet',
            category: 'Cocina',
            description: 'Descubre las técnicas culinarias de la alta cocina y sorprende a tus invitados con platos exquisitos.',
            image: 'https://vabadus.es/images/cache/imagen_nodo/images/articulos/63f5dad113ca7997803191.png'
        },
        {
            name: 'Curso de Yoga y Meditación',
            category: 'Salud y Bienestar',
            description: 'Encuentra la paz interior y mejora tu salud física y mental con prácticas de yoga y meditación.',
            image: 'https://storage.googleapis.com/dycr-web/image/topic/python/logo.png'
        }
    ];

    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
            <NavigationBar/>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:mt-36  max-w-screen-xl mx-auto ">
            {courses.map((course, index) => (
                <div key={index} className="bg-white p- rounded-lg shadow-md border-black border">
                    <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded shadow-lg border border-black" />
                        <div className="p-4 shadow-lg shadow-blue-700 bg-gray-400 border border-black ">
                        <h3 className="text-lg font-semibold">{course.name}</h3>
                        <p className="text-sm text-white md:mt-2">{course.category}</p>
                        <p className="text-sm mt-2">{course.description}</p>
                        </div>
                </div>
                    ))}
                </div>
            </div>
    );  
};

export default CoursesComponent;
