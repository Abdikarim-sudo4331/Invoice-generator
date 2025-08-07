import React from 'react';
import { Award, Shield, Users, Lightbulb, CheckCircle, Star } from 'lucide-react';

const About: React.FC = () => {
  const credentials = [
    { 
      icon: Award, 
      title: "Licensed Electrician", 
      desc: "Fully licensed and certified electrical contractor with state certification"
    },
    { 
      icon: Shield, 
      title: "Insured & Bonded", 
      desc: "Comprehensive insurance coverage and bonding for your peace of mind"
    },
    { 
      icon: Users, 
      title: "Experienced Team", 
      desc: "15+ years of experience in residential and commercial electrical work"
    },
    { 
      icon: Lightbulb, 
      title: "Code Compliant", 
      desc: "All work meets or exceeds current electrical codes and safety standards"
    }
  ];

  const values = [
    "Safety is our top priority in every project",
    "Quality workmanship with attention to detail",
    "Transparent pricing with no hidden costs",
    "Reliable service and timely project completion",
    "Ongoing support and maintenance services"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tayyar Electricals</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tayyar Electricals Limited (TEL) is a registered Electrical Engineering company 
              based in Nairobi, Kenya. TEL has been involved in many projects varying in 
              magnitude, type and complexity.
            </p>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We have gained experience and confidence over the years through thorough handling 
              and successful completion of all our projects, both in the private and public sectors. 
              Our operations have covered construction and installation works for diverse industrial 
              concerns as well as multistory commercial buildings and residential complexes. In addition, 
              we have a fully-fledged maintenance department serving domestic and commercial needs.
            </p>

            <div className="space-y-4 mb-10">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{value}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We believe that the ensuing benefits of our enhanced efficiency shall be reflected 
              by quicker and more accurate response to inquiries and lower costs due to optimum 
              material and time utilization. All of which we tailor to our esteemed clients.
            </p>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              Get In Touch
            </button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/298611/pexels-photo-298611.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Professional electrician at work"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">5.0 Rating</div>
                  <div className="text-sm text-gray-600">50+ Reviews</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Licensed</div>
                  <div className="text-sm text-gray-600">& Insured</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {credentials.map((cred, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <cred.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {cred.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {cred.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact us today for a free consultation and quote. We'll work with you to 
            create the perfect electrical solution for your apartment development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              Get Free Quote
            </button>
            <button className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              Call +254 768 817662
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;