import React from 'react';

const Hero = () => (
  <section
    id="home"
    className="relative flex flex-col md:flex-row rounded-2xl my-8 mb-10 text-slate-800 bg-sky-200 backdrop-blur border border-white/80 max-w-[1300px] mx-auto h-auto md:h-[600px]"
  >
    {/* Text container on the left */}
    <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 text-left z-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold text-[clamp(2rem,6vw,4rem)] mb-4 animate-fadeInUp">
        Smarter Triage, Faster Care
      </h1>
      <p className="text-[clamp(1rem,2.5vw,1.3rem)] font-notoserif text-slate-700 animate-fadeInUp delay-300">
        Our AI-powered tool provides real-time triage levels based on patient vitals, helping medical staff prioritize critical cases instantly.
      </p>
    </div>

    {/* Image container on the right */}
    <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
      <img
        src="https://www.pngarts.com/files/3/Doctor-Transparent.png"
        alt="Doctor"
        className="absolute bottom-0 right-1/2 md:right-12 translate-x-1/2 md:translate-x-0 h-full object-contain"
      />
    </div>
  </section>
);

export default Hero;








