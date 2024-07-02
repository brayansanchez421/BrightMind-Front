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
        arrows: true,
    };

    return (
        <div className="mt-10 lg:mt-20 max-w-6xl mx-auto">
            <Slider {...settings} className="mx-auto w-11/12">
                {phrases.map((phrase, index) => (
                    <div key={index} className="flex flex-col items-center justify-center h-full text-center p-6">
                        <h2 className="text-2xl md:text-3xl italic font-bold text-white mb-4 transition-transform transform hover:scale-105">
                            "{phrase.text}"
                        </h2>
                        <div className="flex justify-center mt-6">
                            <img 
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-transform transform hover:scale-110" 
                                src={phrase.imageUrl} 
                                alt={`Image ${index + 1}`} 
                            />
                        </div>
                        <p className="text-lg md:text-xl text-gray-300 mt-4 font-semibold">
                            — {phrase.author}
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default QuoteCarousel;
