import React from 'react';
import { Zap, Wrench, Shield, Users, ArrowRight, Home, Building, Lightbulb } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Zap,
      title: "Residential & Commercial",
      description: "Comprehensive electrical installation services for residential apartments, commercial buildings, shopping malls, and hospitals & health facilities.",
      features: ["Residential Apartments", "Commercial Buildings", "Shopping Malls", "Hospitals & Health Facilities"],
      color: "blue"
    },
    {
      icon: Wrench,
      title: "Industrial & Infrastructure",
      description: "Specialized electrical installations for data centers, factories, warehouses, and learning institutions with advanced power systems.",
      features: ["Data Centers", "Factories", "Warehouses", "Learning Institutions"],
      color: "green"
    },
    {
      icon: Shield,
      title: "Power Systems & Substations",
      description: "High voltage and low voltage substation installations, airfield lighting systems, and power reticulation for estates, towns & cities.",
      features: ["HV & LV Substations", "Airfield Lighting (AGL)", "Power Reticulations", "Estate Power Systems"],
      color: "orange"
    },
    {
      icon: Users,
      title: "Maintenance & Support",
      description: "Fully-fledged maintenance department serving domestic and commercial needs with comprehensive support services.",
      features: ["Preventive Maintenance", "Emergency Repairs", "Domestic Services", "Commercial Support"],
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-300"
      },
      green: {
        bg: "from-green-500 to-green-600",
        text: "text-green-600",
        border: "border-green-200",
        hover: "hover:border-green-300"
      },
      orange: {
        bg: "from-orange-500 to-orange-600",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:border-orange-300"
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:border-purple-300"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive electrical solutions for residential and commercial properties. 
            From simple repairs to complex installations, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 hover:shadow-lg hover:-translate-y-2`}
              >
                <div className="flex items-start space-x-6 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${colorClasses.bg} rounded-full`}></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`inline-flex items-center space-x-2 ${colorClasses.text} font-semibold hover:underline transition-all duration-200 group`}>
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Specialization Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Learn About <span className="text-blue-600">Our Services</span>
          </h3>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            From residential apartments to large-scale industrial projects, we provide comprehensive 
            electrical solutions tailored to meet diverse client needs across Kenya.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: Building, 
                title: "Diverse Projects", 
                desc: "Projects varying in magnitude, type and complexity"
              },
              { 
                icon: Home, 
                title: "Public & Private", 
                desc: "Serving both private and public sector clients"
              },
              { 
                icon: Lightbulb, 
                title: "Complete Solutions", 
                desc: "From installation to maintenance services"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;