import React from 'react';
import { Home, User, Code, Send } from 'lucide-react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'about', icon: User, label: 'About' },
    { key: 'projects', icon: Code, label: 'Projects' },
    { key: 'contact', icon: Send, label: 'Contact' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-10">
      <div className="max-w-md mx-auto flex justify-around py-4">
        {navItems.map(({ key, icon: Icon, label }) => (
          <button 
            key={key}
            onClick={() => setActiveSection(key)}
            className={`
              flex flex-col items-center 
              ${activeSection === key ? 'text-white' : 'text-gray-500'}
              hover:text-white transition-colors duration-300
            `}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;