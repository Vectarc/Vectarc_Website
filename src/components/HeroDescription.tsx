import { motion } from "framer-motion";

const HeroDescription = () => {
  return (
    <section className="relative bg-[#0c0c0b] section-padding py-32 md:py-64 overflow-hidden border-t border-white/5">
      <div className="max-w-[85rem] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-px bg-primary" />
            <span className="text-[10px] font-display font-black tracking-[0.5em] uppercase text-primary">Philosophy</span>
          </div>

          <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-white font-display font-bold tracking-tighter max-w-6xl">
            Turning visionary ideas into reality requires the right partner—and that&apos;s where we come in. 
            As a forward-thinking design and engineering studio, we collaborate with innovators to 
            overcome complex challenges and push boundaries that others won&apos;t.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground font-body text-lg md:text-xl leading-relaxed">
            <p>
               Beyond delivering exceptional design services, we also develop our own purpose-built solutions, 
               including products that effectively process bio-waste and high-performance acoustic and 
               thermal-insulation blankets that control noise and temperature with unmatched efficiency. 
            </p>
            <p>
              Whether you&apos;re creating something new or solving an urgent operational issue, we&apos;re here 
              to transform your vision into practical, high-impact results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroDescription;
