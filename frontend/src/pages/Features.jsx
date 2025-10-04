import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    title: 'Instant Triage Prediction',
    description: 'Get a real-time triage level (Low, Medium, or High) based on vitals to prioritize care fast.',
    image: 'https://cbx-prod.b-cdn.net/COLOURBOX67334905.jpg?width=800&height=800&quality=70',
  },
  {
    title: 'Multi-Disease Support',
    description: 'Handles a range of conditions including respiratory issues, infections, and general emergencies.',
    image: 'https://www.shutterstock.com/image-vector/chronic-disease-health-conditions-sign-600nw-2344760363.jpg',
  },
  {
    title: 'Simple Input Form',
    description: 'Just enter basic patient information like age, vitals, and symptoms—no deep medical knowledge needed.',
    image: 'https://cdn-icons-png.flaticon.com/512/4254/4254330.png',
  },
  {
    title: 'Real-world medical data',
    description: 'Symcat-inspired triage assistant trained on an open Kaggle dataset. It predicts possible conditions from symptoms and prioritizes urgency.',
    image: 'https://cdn-icons-png.flaticon.com/512/11411/11411453.png',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const hoverEffect = {
  scale: 1.03,
  rotate: 0.5,
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
};
const Card = ({ feature, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      whileHover={hoverEffect}
      className="bg-sky-200 border border-sky-300 rounded-xl overflow-hidden shadow-lg cursor-pointer
                 max-w-full sm:max-w-xs mx-auto"
    >
      <img
        src={feature.image}
        alt={feature.title}
        className="h-44 w-full object-contain bg-white p-2 rounded-t-xl"
      />
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-notoserif font-bold text-slate-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 italic">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => (
  <section id="features" className="py-20 px-4 sm:px-6 lg:px-12">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-center mt-12 text-slate-800 mb-20">
      Features
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {features.map((feature, index) => (
        <Card key={index} feature={feature} delay={index * 0.2} />
      ))}
    </div>
  </section>
);

export default Features;







