import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Workflow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="workflow" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-10">
          How it works?
        </h2>
           <motion.img
  src="/workflow.png"
  alt="Workflow Diagram"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={isInView ? { opacity: 1, scale: 1 } : {}}
  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
  whileHover={{
    scale: 1.02,
    rotate: 0.5,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  }}
  className="
    mx-auto 
    mt-10 sm:mt-16 md:mt-20
    w-full 
    max-w-full 
    h-auto 
    md:h-[380px]
    md:w-auto
    cursor-pointer
  "
/>

      </motion.div>
    </section>
  );
};

export default Workflow;


