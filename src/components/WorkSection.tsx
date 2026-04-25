import { motion } from "framer-motion";
import aboutBg from "@/assets/about-bg.jpg";

const WorkSection = () => {
  return (
    <section id="work" className="relative min-h-[500px] md:py-44 flex items-center overflow-hidden">
      <motion.img
        src={aboutBg}
        alt="Engineering workbench"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
        width={1920}
        height={1080}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="relative z-10 section-padding text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Let's bring your vision to life — together.
          </h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-sm font-body rounded hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
