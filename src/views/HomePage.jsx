import React from 'react';
import NavigationBar from '../components/Home/NavigationBar';
import QuoteCarousel from '../components/Home/QuoteCarousel';
import CategorySection from '../components/Home/CategorySection';
import CourseSection from '../components/Home/CourseSection';

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

  // Categorías para la sección de categorías
  const categories = [
    { name: 'Next.js', link: '#' },
    { name: 'Docker', link: '#' },
    { name: 'Node.Js: From Zero to Expert', link: '#' },
    { name: 'S.O.L.I.D.', link: '#' },
    { name: 'Next.js: The React Framework Docker - Practical Usage Guide for Production', link: '#' },
    { name: 'SOLID Principles and Clean Code', link: '#' },
    { name: 'Modern JavaScript: Guide to Mastering the Language', link: '#' },
  ];

  // Elementos de curso para la sección de cursos
  const courseItems = [
    { 
      title: 'Curso 1',
      rating: '4.5 Estrellas',
      author: 'Autor del Curso 1',
      tag: 'Tag del Curso 1',
      price: 'Precio del Curso 1'
    },
    { 
      title: 'Curso 2',
      rating: '4.8 Estrellas',
      author: 'Autor del Curso 2',
      tag: 'Tag del Curso 2',
      price: 'Precio del Curso 2'
    },
    // Agrega más elementos de curso según sea necesario
  ];

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
      <div>
        <NavigationBar/>
      </div>
      <QuoteCarousel phrases={phrases} />
      <CategorySection categories={categories} />
      <CourseSection courseItems={courseItems} />
    </div>
  );
}

export default HomePage;

