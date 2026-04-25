import { motion } from "framer-motion";
import teamImage from "@/assets/team-image.jpg";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-background section-padding py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <div>
            <motion.p variants={itemVariants} className="text-sm tracking-[0.3em] uppercase text-primary mb-3 font-body">
              About Us
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Thinkers. Makers.
              <br />
              Explorers.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
              We are a team of thinkers, makers, and explorers passionate about challenging projects
              that enhance lives, communities, and minimize our impact on the planet.
            </motion.p>
            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 text-[10px] font-display font-black tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/10"
            >
              Work With Us
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <img
              src={teamImage}
              alt="Our team collaborating on engineering projects"
              className="w-full rounded object-cover aspect-[16/10]"
              loading="lazy"
              width={1280}
              height={720}
            />
            <div className="absolute inset-0 rounded ring-1 ring-inset ring-foreground/5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
