import React from 'react';
import { Building, Users, Zap, Calendar, ArrowUpRight, MapPin } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Sunrise Apartments",
      location: "Downtown District",
      units: 120,
      year: "2024",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Complete electrical installation for a 12-story luxury apartment complex featuring smart home integration and energy-efficient LED lighting throughout.",
      features: ["Smart Home Wiring", "Energy Efficient Systems", "Emergency Backup Power", "EV Charging Stations"],
      status: "Completed"
    },
    {
      title: "Garden View Residences",
      location: "Suburban Area",
      units: 80,
      year: "2024", 
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Comprehensive electrical renovation and upgrade for an existing apartment building, including panel upgrades and modern fixture installations.",
      features: ["Panel Upgrades", "Modern Fixtures", "Safety Compliance", "Tenant Coordination"],
      status: "In Progress"
    },
    {
      title: "University Commons",
      location: "University District",
      units: 200,
      year: "2023",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Large-scale electrical infrastructure for student housing complex with high-speed internet wiring and study area lighting optimization.",
      features: ["High-Speed Data Wiring", "Study Area Lighting", "Common Area Systems", "Maintenance Planning"],
      status: "Completed"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Completed' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a look at some of our recent apartment development projects. 
            Each project showcases our commitment to quality and safety.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 text-sm font-medium">{project.year}</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{project.units} units</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center space-x-2 bg-white border-2 border-gray-200 rounded-full px-6 py-3 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
                    <span className="text-gray-900 font-medium">View Details</span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Projects Completed", icon: Building },
              { number: "5000+", label: "Units Wired", icon: Users },
              { number: "15+", label: "Years Experience", icon: Zap },
              { number: "100%", label: "Safety Record", icon: ArrowUpRight }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;