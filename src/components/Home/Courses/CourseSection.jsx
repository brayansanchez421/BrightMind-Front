import React from 'react';

function CourseSection({ courseItems }) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          BEST SELLERS
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseItems.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:bg-gray-100 transition duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <span className="text-yellow-400 mr-1">{course.rating}</span>
              <span className="text-xs text-gray-500">
                ({course.rating.split(" ")[1]})
              </span>
              <p className="text-gray-600 mb-2">{course.author}</p>
              <p className="text-gray-600">{course.tag}</p>
              <div className="text-gray-600">
                <span className="line-through mr-2">599,900 COL$</span> 
                <span>{course.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default CourseSection;
