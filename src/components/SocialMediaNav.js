import React from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram 
} from 'react-icons/fa';

export const SocialMediaNav = () => {
  const socialLinks = [
    { 
      icon: FaGithub, 
      href: "https://github.com/yourusername",
      ariaLabel: "GitHub Profile" 
    },
    { 
      icon: FaLinkedin, 
      href: "https://linkedin.com/in/yourusername",
      ariaLabel: "LinkedIn Profile" 
    },
    { 
      icon: FaTwitter, 
      href: "https://twitter.com/yourusername",
      ariaLabel: "Twitter Profile" 
    },
    { 
      icon: FaInstagram, 
      href: "https://instagram.com/yourusername",
      ariaLabel: "Instagram Profile" 
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-4">
      {socialLinks.map(({ icon: Icon, href, ariaLabel }) => (
        <a 
          key={href}
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="
            text-gray-400 hover:text-white 
            transition-colors duration-300 
            transform hover:scale-110
          "
        >
          <Icon size={45} />
        </a>
      ))}
    </div>
  );
};