import React from 'react';
import { Send } from 'lucide-react';

const SectionContent = ({ section, isLoaded }) => {
  // Dynamically render section content based on the active section
  const renderContent = () => {
    if (section.renderFunction) {
      return section.renderFunction(isLoaded);
    }
    return section.content;
  };

  return renderContent();
};

export default SectionContent;