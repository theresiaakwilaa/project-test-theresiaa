import { useEffect, useRef, useState } from 'react';

const Banner = ({ imageUrl }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageSrc = imageError || !imageUrl ? fallbackImage : imageUrl;

  return (
    <div className="relative h-[300px] overflow-hidden">
      {/* Background image */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300"
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gray-500 bg-opacity-30 z-10"></div>

      {/* Text content */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center"
      >
        <h1 className="text-4xl font-medium drop-shadow-lg">Ideas</h1>
        <p className="mt-2 font-extralight drop-shadow-md">Where all our great things begin</p>
      </div>

      {/* SVG Shape divider (bottom tilt) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon fill="#ffffff" points="0,100 100,0 100,100" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
