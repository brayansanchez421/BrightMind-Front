import React from 'react';
import NavigationBar from './NavigationBar';

const AboutUs = () => {
    return (
        <div className=''>
            <NavigationBar/>
        <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen flex justify-center items-center">
        <div className="md:mx-4 md:my-10 bg-white shadow-2xl shadow-black p-6">
                <h2 className='text-center text-2xl font-black md:mb-4 '>About Us</h2>
                <p>Welcome to our educational platform! We are dedicated to providing high-quality learning resources and opportunities for students of all ages.</p><br/>
                <p>Our mission is to make education accessible to everyone, regardless of location or background. Whether you're a student looking to expand your knowledge or an educator seeking to enhance your teaching skills, we're here to support you every step of the way.</p>
                <p>At our platform, you'll find a wide range of courses, interactive lessons, and educational materials covering various subjects, from mathematics and science to humanities and arts.</p>
                <p>We believe in the power of education to transform lives and communities. Join us on this journey towards lifelong learning and personal growth!</p>
                <p>For any inquiries or feedback, please don't hesitate to <a href="/contact">contact us</a>.</p>
        </div>
        </div>
    </div>
    );
};

export default AboutUs;
