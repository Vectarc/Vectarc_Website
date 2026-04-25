import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background image with subtle technical overlay */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Technical engineering facility"
          className="w-full h-full object-cover object-center scale-105 opacity-100"
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />
      </motion.div>

      <div className="relative z-20 section-padding w-full max-w-[90rem] mx-auto py-24">
        <div className="max-w-5xl">


          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[10vw] md:text-[8vw] lg:text-[6.5rem] font-display font-black leading-[1.05] tracking-tighter"
            >
              <span className="text-foreground block">Design for</span>
              <span className="text-primary block">Real Challenges.</span>
            </motion.h1>
          </div>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-10 mt-20"
          >
            <a
              href="#contact"
              className="group relative bg-primary text-primary-foreground px-12 py-5 text-[11px] tracking-[0.4em] font-display font-black uppercase overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">
                Contact Us
              </span>
            </a>
            
            <a href="#capabilities" className="group text-[11px] tracking-[0.4em] font-display font-black uppercase text-foreground hover:text-primary transition-all flex items-center gap-4">
              <span className="w-12 h-px bg-primary/30 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              Our Services
            </a>
          </motion.div>
 
          {/* Philosophy / Description Section (Merged on Image) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-32 pt-24 border-t border-foreground/10 max-w-4xl"
          >
             <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-primary/50" />
              <span className="text-[10px] font-display font-black tracking-[0.5em] uppercase text-primary">Philosophy</span>
            </div>
            
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.1] text-black font-display font-bold tracking-tighter mb-12">
              Turning visionary ideas into reality requires the right partner—and that&apos;s where we come in. 
              We collaborate with innovators to overcome complex challenges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-black font-body text-base md:text-lg leading-relaxed">
              <p>
                 Beyond delivering exceptional design services, we also develop our own purpose-built solutions, 
                 including products that effectively process bio-waste with unmatched efficiency. 
              </p>
              <p>
                Whether you&apos;re creating something new or solving an urgent operational issue, we&apos;re here 
                to transform your vision into practical results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      

    </section>
  );
};

export default HeroSection;
