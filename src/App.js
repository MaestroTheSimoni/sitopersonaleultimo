import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SectionContent from './components/SectionContent';
import ProfessionalSpaceBackground from './components/ProfessionalSpaceBackground';
import { sections } from './data/sections';

const PersonalPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on section change
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Professional Space Background */}
      <ProfessionalSpaceBackground />

      {/* Navigation */}
      <nav className="relative z-50">
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 pb-24 max-w-4xl relative z-40">
        <section className="min-h-[calc(100vh-100px)] flex items-center">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-center mb-8">
              {sections[activeSection].title}
            </h2>
            <SectionContent 
              section={sections[activeSection]} 
              isLoaded={isLoaded} 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PersonalPortfolio;