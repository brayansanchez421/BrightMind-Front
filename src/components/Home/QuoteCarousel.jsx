import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function QuoteCarousel({ phrases }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className="w-full flex justify-center mx-auto mt-4">
            <Slider {...settings} className="w-full lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
                {phrases.map((phrase, index) => (
                    <div key={index} className="flex flex-col items-center justify-center text-center p-4 md:p-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic font-bold text-white mb-2 md:mb-4 transition-transform transform hover:scale-105">
                            "{phrase.text}"
                        </h2>
                        <div className="flex justify-center mt-4 md:mt-6">
                            <img 
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-transform transform hover:scale-110" 
                                src={phrase.imageUrl} 
                                alt={`Image ${index + 1}`} 
                            />
                        </div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mt-2 md:mt-4 font-semibold">
                            — {phrase.author}
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default QuoteCarousel;
