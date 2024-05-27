import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function QuoteCarousel({ phrases }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="lg:mt-10"> {/* Ajuste del margen superior para dispositivos de diferentes tamaños */}
            <Slider {...settings} className="mx-auto w-11/12 mt-10 ">
                {phrases.map((phrase, index) => (
                    <div className="flex flex-col items-center justify-center h-full mx-auto">
                        <div className="text-center">
                            <h2 className="text-4xl italic font-bold text-white mb-4">{phrase.text}</h2>
                        </div>
                        <div className="flex justify-center mt-6">
                            <img className="h-40 rounded-full object-cover" src={phrase.imageUrl} alt={`Image ${index + 1}`} />
                        </div>
                        <div>
                        <p className="text-right mt-4 mr-10 font-black">— {phrase.author}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default QuoteCarousel;
