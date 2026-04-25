import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-section-alt section-padding py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Let&apos;s work
              <br />
              together.
            </h2>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-sm font-body rounded hover:bg-primary/90 transition-all duration-300 mb-12"
            >
              Contact Us
            </motion.a>
            <div className="mt-8">
              <p className="text-sm text-foreground/60 font-body mb-1 uppercase tracking-widest">VECTARC</p>
              <a 
                href="mailto:infovectarc@gmail.com" 
                className="text-sm text-foreground font-body hover:text-primary transition-colors"
              >
                infovectarc@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">Contact Us</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
