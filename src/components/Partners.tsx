import React from 'react';
import { Handshake, Award, Globe, Users } from 'lucide-react';

const Partners: React.FC = () => {
  const partners = [
    {
      name: "Partner Network",
      logo: "/partners.PNG", 
      description: "Our trusted partner ecosystem"
    }
  ];

  const partnershipBenefits = [
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Partnerships with industry-leading manufacturers ensure top-quality components and materials"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Access to international best practices and cutting-edge electrical technologies"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Technical support and training from our trusted manufacturing partners"
    },
    {
      icon: Handshake,
      title: "Reliable Supply",
      description: "Consistent availability of quality electrical components for all project needs"
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We collaborate with industry-leading manufacturers and suppliers to deliver 
            the highest quality electrical solutions for our clients.
          </p>
        </div>

        {/* Partner Logos */}
        <div className="mb-20">
          <div className="flex justify-center max-w-2xl mx-auto">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Partnership <span className="text-blue-600">Benefits</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our strategic partnerships enable us to provide superior electrical solutions 
              with guaranteed quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center group hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Partnership?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're always looking to expand our network of trusted partners. 
            Contact us to explore collaboration opportunities.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;