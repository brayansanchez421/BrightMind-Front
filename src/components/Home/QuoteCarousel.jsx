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
    };

    return (
        <div className="mt-16 sm:mt-20 lg:mt-24"> {/* Ajuste del margen superior para dispositivos de diferentes tamaños */}
            <Slider {...settings} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {phrases.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-center h-full">
                        <div className="w-4/5 flex items-center justify-center h-full mx-auto">
                            <div className="w-3/5 pr-8">
                                <h2 className="text-3xl font-semibold text-center mb-4">{phrase.text}</h2>
                                <p className="text-center">— {phrase.author}</p>
                            </div>
                            <div className="w-1/5 flex justify-end items-center">
                                <img className="h-40 rounded-full object-cover" src={phrase.imageUrl} alt={`Image ${index + 1}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default QuoteCarousel;
