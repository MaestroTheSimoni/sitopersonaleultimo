import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialMediaNav = () => {
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

const ContactForm = ({ isLoaded }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: 'riccardo.de.simoni01@gmail.com',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = React.useState({
    isSubmitting: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ isSubmitting: true, success: false, error: false });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "8f3c7305-95e9-4754-9b2f-5fa28af39ea2", // Web3Forms access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ isSubmitting: false, success: true, error: false });
        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ isSubmitting: false, success: false, error: true });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ isSubmitting: false, success: false, error: true });
    }
  };

  return (
      <div className={`
        opacity-0 translate-y-10 transition-all duration-1000 delay-400
        ${isLoaded ? 'opacity-100 translate-y-0' : ''}
      `}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              required
              className="
                w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none 
                focus:ring-2 focus:ring-gray-600 transition-all duration-300
              "
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              required
              className="
                w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none 
                focus:ring-2 focus:ring-gray-600 transition-all duration-300
              "
            />
          </div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            required
            className="
              w-full p-3 bg-gray-800 border border-gray-700 rounded-lg 
              text-white placeholder-gray-400 focus:outline-none 
              focus:ring-2 focus:ring-gray-600 h-40 transition-all duration-300
            "
          />
          {submitStatus.success && (
            <div className="text-green-500 text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus.error && (
            <div className="text-red-500 text-center">
              Oops! There was an error sending your message. Please try again.
            </div>
          )}
          <button 
            type="submit"
            disabled={submitStatus.isSubmitting}
            className={`
              w-full text-white py-4 rounded-lg transition-all duration-300 
              flex items-center justify-center gap-2
              ${submitStatus.isSubmitting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600'}
            `}
          >
            {submitStatus.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
  );
}

export const sections = {
  home: {
    title: 'Hi, I\'m Riccardo De Simoni',
    renderFunction: (isLoaded) => (
      <>
        <SocialMediaNav />
        <div className={`
          opacity-0 translate-y-10 transition-all duration-1000 
          ${isLoaded ? 'opacity-100 translate-y-0' : ''}
          text-center
        `}>
          <h1 className="text-5xl font-extrabold text-white mt-8">
          Riccardo De Simoni
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            Welcome to my digital space. I create elegant solutions to complex problems.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <a 
              href="#contact" 
              className="
                px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 
                text-white rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 
                hover:scale-105 transition-all duration-300
              "
            >
              Contact Me
            </a>
            <a 
              href="#projects" 
              className="
                px-6 py-3 border-2 border-gray-700 text-gray-300 
                rounded-full hover:bg-gray-800 hover:text-white 
                hover:scale-105 transition-all duration-300
              "
            >
              View Projects
            </a>
          </div>
        </div>
      </>
    )
  },
  about: {
    title: 'About Me',
    renderFunction: (isLoaded) => (
      <>
        <SocialMediaNav />
        <div className={`
          opacity-0 translate-y-10 transition-all duration-1000 delay-200
          ${isLoaded ? 'opacity-100 translate-y-0' : ''}
        `}>
          <p className="text-lg text-gray-400 leading-relaxed">
            I'm a passionate developer with deep expertise in creating innovative digital solutions. 
            My journey is driven by curiosity, precision, and a constant desire to push technological boundaries.
          </p>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Professional Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['React', 'TypeScript', 'Python', 'Node.js', 'Docker', 'Machine Learning'].map(skill => (
                <div 
                  key={skill}
                  className="
                    bg-gray-800 p-4 rounded-lg text-center 
                    transform hover:scale-105 hover:bg-gray-700 
                    transition-all duration-500
                  "
                >
                  <span className="font-semibold text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  },
  projects: {
    title: 'Selected Projects',
    renderFunction: (isLoaded) => (
      <>
        <SocialMediaNav />
        <div className={`
          grid md:grid-cols-2 lg:grid-cols-3 gap-6
          opacity-0 translate-y-10 transition-all duration-1000 delay-300
          ${isLoaded ? 'opacity-100 translate-y-0' : ''}
        `}>
          {[
            { 
              name: 'Project Alpha', 
              description: 'Advanced web platform with microservices architecture', 
              technologies: ['React', 'Node.js', 'Docker'],
            },
            { 
              name: 'Machine Learning Suite', 
              description: 'Predictive analytics toolkit for business intelligence', 
              technologies: ['Python', 'Pandas', 'scikit-learn'],
            },
            { 
              name: 'Real-time Collaboration Tool', 
              description: 'Synchronized workspace for remote teams', 
              technologies: ['TypeScript', 'WebSockets', 'GraphQL'],
            }
          ].map(project => (
            <div 
              key={project.name}
              className="
                bg-gray-800 p-6 rounded-lg hover:shadow-xl transform 
                hover:scale-105 transition-all duration-500
              "
            >
              <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
  contact: {
    title: 'Get in Touch',
    renderFunction: (isLoaded) => (
      <>
        <SocialMediaNav />
        <ContactForm isLoaded={isLoaded} />
      </>
    )
  }
};