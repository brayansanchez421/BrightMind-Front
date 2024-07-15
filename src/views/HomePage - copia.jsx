import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../context/courses/category.context";
import { useCoursesContext } from "../context/courses/courses.context";
import NavigationBar from "../components/Home/NavigationBar";
import QuoteCarousel from "../components/Home/QuoteCarousel";
import HoverCard from "../components/Home/Cards/HoverCard";

const HomePage = () => {
  const { getCoursesByCategory } = useCoursesContext();
  const { categories, getCategories } = useCategoryContext();
  const navigate = useNavigate();
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    if (!categoriesLoaded) {
      getCategories();
      setCategoriesLoaded(true);
    }
  }, [categoriesLoaded, getCategories]);

  const phrases = [
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      imageUrl: "https://th.bing.com/th/id/OIG1._bdTJRgcKBp2wYC3oen1?pid=ImgGn",
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nelson_Mandela_1994_%282%29.jpg/1200px-Nelson_Mandela_1994_%282%29.jpg",
    },
    {
      text: "The only place where success comes before work is in the dictionary.",
      author: "Vidal Sassoon",
      imageUrl: "https://cdijum.mx/wp-content/uploads/2018/01/sassoon-nyt.jpg",
    },
    {
      text: "The mind that opens to a new idea never returns to its original size.",
      author: "Albert Einstein",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
    },
    {
      text: "The road to success and the road to failure are almost exactly the same.",
      author: "Colin R. Davis",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Colin_Davis_%281967%29.jpg",
    },
    {
      text: "The only source of knowledge is experience.",
      author: "Albert Einstein",
      imageUrl:
        "https://c.files.bbci.co.uk/assets/aabea4fb-7ebf-43e9-b431-b1480f3ca926",
    },
  ];

  const handleCardClick = (category) => {
    getCoursesByCategory(category.name);
    navigate(`/CoursesHome`, { state: { title: category.name } });
  };

  return (
    <div className="bg-gradient-to-t from-blue-200 via-blue-400 to-blue-600 flex h-full overflow-auto">
      <div className="flex  h-screen w-screen flex-col mx-auto">
        <NavigationBar />
        <QuoteCarousel phrases={phrases} />
        <div className="text-center ">
          <h1 className="text-3xl sm:text-4xl mt-4 font-bold text-white">
            Explore Our Courses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 font-semibold">
            Find the perfect course for you from our wide selection of
            categories
          </p>
        </div>
        <div className="flex justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
            {categories.map((category, index) => (
              <HoverCard
                key={index}
                title={category.name}
                description={category.description}
                ruta={category.image}
                onClick={() => handleCardClick(category)}
                className="transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
