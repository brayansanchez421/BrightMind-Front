import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./../NavigationBar";
import { useUserContext } from "../../../context/user/user.context";
import { useAuth } from "../../../context/auth.context";
import { useTranslation } from 'react-i18next';

const CoursesComponent = () => {
  const { t } = useTranslation("global");
  const { user } = useAuth();
  const { getUserCourses } = useUserContext();
  const [userCourses, setUserCourses] = useState([]);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (user && user.data && user.data.id) {
        try {
          const courses = await getUserCourses(user.data.id);
          setUserCourses(courses);
        } catch (error) {
          console.error("Error al obtener los cursos del usuario:", error);
        }
      }
    };

    fetchUserCourses();
  }, [user, getUserCourses]);

  const handleCourseClick = (courseId) => {
    console.log("Course ID:", courseId);
    navigate(`/course/${courseId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(userCourses.length / itemsPerPage);
  const paginatedCourses = userCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen overflow-hidden">
      <NavigationBar />
      <div className="mt-10 flex justify-center">
        <h1 className="text-center text-3xl text-white font-black flex justify-center shadow-orange italic shadow-red-400 p-3 border border-white bg-gradient-to-t from-red-400 to-pink-300">
          {t('coursesComponent.your_courses')}
        </h1>
      </div>
      <div
        className="grid  
        grid-cols-1 gap-4 p-4 mx-1 mt-10
        sm:grid-cols-2 sm:gap-3 sm:p-4 sm:mx-2 sm:mt-16     
        md:grid-cols-3 md:gap-3 md:p-4 md:mt-20
        lg:grid-cols-4 lg:gap-2 lg:p-4 lg:mt-14
        xl:grid-cols-5 xl:gap-4 xl:p-4
      "
      >
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="relative bg-white rounded-lg shadow-md border cursor-pointer transform hover:scale-105 transition-transform border-white"
            onClick={() => handleCourseClick(course._id)}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover rounded-t-lg"
            />
            <div className="p-auto bg-gray-700 md:bg-gradient-to-tr md:p-2 from-purple-600 to-red-400 rounded-b-lg border border-white">
              <h3 className="text-lg sm:text-xl font-bold text-center text-white">
                {course.title}
              </h3>
              <p className="text-base mt-1 text-slate-200 text-center md:hidden py-2">
                {course.description}
              </p>
            </div>
            <div className="absolute inset-0 
            bg-opacity-90 flex items-center justify-center opacity-0
            sm:hover:opacity-90 sm:border sm:border-white
            bg-gradient-to-b from-red-400 to-pink-500 lg:hover:opacity-95 lg:border lg:border-white transition-opacity
            ">
              <p className="text-center text-gray-900 overflow-hidden whitespace-wrap
              sm:text-lg sm:text-white sm:font-semibold
              md:text-lg md:text-white md:font-semibold 
              lg:text-white lg:font-semibold lg:border-white lg:text-ellipsis lg:text-xl">
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mb-8 mt-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 border"
          >
            {t('coursesComponent.previous')}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-black border text-white"
                  : "bg-gray-200 text-gray-800 border"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 border"
          >
            {t('coursesComponent.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesComponent;
