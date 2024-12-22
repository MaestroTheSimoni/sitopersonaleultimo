import React, { useState, useEffect } from 'react';

const ProfessionalSpaceBackground = () => {
  const [stars, setStars] = useState([]);
  const [atomStars, setAtomStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on initial load
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    // Add resize listener
    const handleResize = () => {
      setIsMobile(checkMobile());
    };
    window.addEventListener('resize', handleResize);

    // Generate traditional stars - fewer on mobile
    const starCount = isMobile ? 50 : 100;
    const newStars = Array.from({ length: starCount }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.1 + 0.05
    }));
    setStars(newStars);

    // Define skills for each atom
    const atomData = [
      {
        skills: ['C', 'Python'],
        colors: ['bg-blue-500', 'bg-purple-500']
      },
      {
        skills: ['C++', 'Java'],
        colors: ['bg-green-500', 'bg-yellow-500']
      },
      {
        skills: ['JavaScript', 'Go', 'Rust'],
        colors: ['bg-red-500', 'bg-green-500', 'bg-teal-500']
      },
      {
        skills: ['JavaScript', 'Go', 'Rust'],
        colors: ['bg-pink-500', 'bg-orange-500', 'bg-blue-500']
      }
    ];

    // Fixed positions for the atoms
    const newAtomPositionsX = [30, 40, 65, 20]; // Spread across width
    const newAtomPositionsY = [40, 40, 30, -5]; // Spread across height a b 60 10

    // Generate atom-like stars with responsive sizing
    const newAtomStars = atomData.map((atom, index) => ({
      id: `atom-${index}`,
      x: newAtomPositionsX[index], // Removed the -1
      y: newAtomPositionsY[index], // Removed the +100
      size: isMobile ? 400 : 700,
      orbits: atom.skills.map((skill, orbitIndex) => ({
        radius: (50 + orbitIndex * 30) * (isMobile ? 0.6 : 1),
        speed: 2.2 - orbitIndex,
        color: atom.colors[orbitIndex % atom.colors.length],
        skill: skill
      }))
    }));
    setAtomStars(newAtomStars);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Starry background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black opacity-90">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle 2s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Atom-like stars */}
        {atomStars.map(atomStar => (
          <div
            key={atomStar.id}
            className="absolute"
            style={{
              left: `${atomStar.x}%`,
              top: `${atomStar.y}%`,
              width: `${atomStar.size}px`,
              height: `${atomStar.size}px`,
              position: 'absolute',
              transform: isMobile ? 'scale(0.75)' : 'scale(1.75)'
            }}
          >
            {/* Orbital electrons with skills */}
            {atomStar.orbits.map((orbit, index) => (
              <div
                key={index}
                className="absolute rounded-full border-2 border-white/30"
                style={{
                  width: `${orbit.radius * 2}px`,
                  height: `${orbit.radius * 2}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `orbitRotate${index} ${10 / orbit.speed}s linear infinite`
                }}
              >
                <div
                  className={`absolute ${orbit.color} rounded-full flex items-center justify-center text-white text-[8px] md:text-xs`}
                  style={{
                    width: isMobile ? '30px' : '50px',
                    height: isMobile ? '30px' : '50px',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                  }}
                >
                  {orbit.skill}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Moon */}
      <div
        className="absolute top-[10%] right-[10%] bg-gray-300 rounded-full shadow-2xl
                   w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
        style={{
          filter: 'blur(2px)',
          animation: 'float 6s ease-in-out infinite',
          boxShadow: '0 0 50px rgba(200,200,220,0.5)'
        }}
      />

      {/* Planets */}
      <div
        className="absolute bottom-[20%] left-[15%] bg-purple-700 rounded-full
                   w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
        style={{
          animation: 'orbit 12s linear infinite',
          boxShadow: '0 0 30px rgba(128,0,128,0.5)'
        }}
      />
      <div
        className="absolute top-[30%] left-[5%] bg-teal-500 rounded-full
                   w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
        style={{
          animation: 'orbit 15s linear infinite reverse',
          boxShadow: '0 0 25px rgba(0,128,128,0.5)'
        }}
      />

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(${isMobile ? '75px' : '150px'}) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(${isMobile ? '75px' : '150px'}) rotate(-360deg); }
        }
        @keyframes orbitRotate0 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitRotate1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitRotate2 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitRotate3 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalSpaceBackground;