import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Professional Wiring Installation",
      description: "Complete electrical systems for apartment complexes"
    },
    {
      image: "/Engineers designs.jpg",
      title: "Engineering & Design",
      description: "Expert electrical system design and planning"
    },
    {
      image: "/Engineers 11.jpg",
      title: "Expert Team",
      description: "Experienced engineers and technicians"
    },
    {
      image: "/Engineers.jpg",
      title: "Professional Engineers",
      description: "Skilled electrical engineers at work"
    },
    {
      image: "/Engineers designs - Copy.jpg",
      title: "Technical Drawings",
      description: "Detailed electrical system blueprints"
    },
    {
      image: "/Chint 1.jpg",
      title: "Quality Components",
      description: "Premium electrical equipment and materials"
    },
    {
      image: "/Chint catalogue.jpg",
      title: "Product Range",
      description: "Extensive catalogue of electrical solutions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Bringing Power and
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stability to Your World
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Expert solutions for your electrical wiring,
            <br />
            installation, and repair needs.
          </p>

          {/* Electrical Plug Illustration */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <svg
                width="200"
                height="300"
                viewBox="0 0 200 300"
                className="text-gray-800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Plug */}
                <rect
                  x="60"
                  y="40"
                  width="80"
                  height="60"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                
                {/* Plug Prongs */}
                <rect x="80" y="20" width="8" height="30" fill="currentColor" rx="4" />
                <rect x="112" y="20" width="8" height="30" fill="currentColor" rx="4" />
                
                {/* Plug Lines */}
                <line x1="75" y1="60" x2="125" y2="60" stroke="currentColor" strokeWidth="3" />
                <line x1="75" y1="70" x2="125" y2="70" stroke="currentColor" strokeWidth="3" />
                <line x1="75" y1="80" x2="125" y2="80" stroke="currentColor" strokeWidth="3" />
                
                {/* Cable */}
                <path
                  d="M100 100 Q100 140 100 180"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Outlet */}
                <rect
                  x="40"
                  y="180"
                  width="120"
                  height="80"
                  rx="12"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                
                {/* Outlet Holes */}
                <rect x="70" y="200" width="12" height="20" fill="currentColor" rx="6" />
                <rect x="118" y="200" width="12" height="20" fill="currentColor" rx="6" />
                <circle cx="100" cy="240" r="6" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Zap, 
                title: "Professional Wiring", 
                desc: "Expert electrical wiring for residential and commercial properties"
              },
              { 
                icon: Shield, 
                title: "Safety First", 
                desc: "All installations meet the highest safety standards and regulations"
              },
              { 
                icon: Award, 
                title: "Licensed & Insured", 
                desc: "Fully licensed electricians with comprehensive insurance coverage"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <button
              onClick={scrollToContact}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={scrollToServices}
              className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              View Services
            </button>
          </div>

          {/* Image Slider */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-80 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                      <p className="text-white/90">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Slider Indicators */}
              <div className="absolute bottom-4 right-6 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-opacity duration-200 ${
                      index === currentSlide ? 'bg-white opacity-100' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;