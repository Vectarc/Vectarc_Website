import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, Thermometer, Wrench, Code, ChevronRight, Sparkles } from "lucide-react";

const phases = [
  {
    title: "Design Research & Product Strategy",
    icon: Search,
    items: ["Competitive Analysis",
      "Market Research",
      "Trend Analysis",
      "User Personas",
      "Customer Journey Mapping",
      "Usability Testing",
      "Brand Strategy"],
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Acoustic / Thermal Management",
    icon: Thermometer,
    items: ["Antifreeze Jackets", "Insulated Jackets", "Acoustic Jackets", "Cut To Size Blankets"],
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Mechanical Design & Engineering",
    icon: Wrench,
    items: [
      "Design for Manufacture",
      "Thermal & Shock",
      "Analysis FEA",
      "Alpha Prototypes",
      "Fabrication Documentation",
      "Vendor Coordination",
      "Testing",
    ],
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Software Development & Integration",
    icon: Code,
    items: [
      
    ],
    color: "from-primary/20 to-transparent"
  },
];

const CapabilityCard = ({ phase, index }: { phase: typeof phases[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = phase.icon;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full h-[480px] perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 350, 
          damping: 22,
          mass: 0.6
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Ambient Glow - Now moves with the card */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${phase.color} rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
          style={{ transform: "translateZ(-1px)" }}
        />

        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-card border border-primary/10 rounded-3xl p-10 flex flex-col shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="relative z-10 flex flex-col h-full text-card-foreground">
            <div className={`w-20 h-20 rounded-2xl bg-card-foreground/5 text-card-foreground border border-card-foreground/10 flex items-center justify-center mb-10 transition-colors group-hover:bg-card-foreground/10 group-hover:border-card-foreground/20`}>
              <Icon size={40} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-display font-bold text-card-foreground tracking-tighter leading-[1.1] mb-6">
              {phase.title}
            </h3>

            <div className="mt-auto flex items-center justify-end text-card-foreground/60">
              <div className={`flex items-center gap-2 text-[10px] font-bold text-card-foreground tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 ${isFlipped ? 'pointer-events-none' : ''}`}>
                Details <ChevronRight size={14} />
              </div>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-card border border-primary/10 rounded-3xl p-10 flex flex-col shadow-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="mb-8 flex items-center justify-between">
            <h4 className="text-[10px] font-display font-black text-card-foreground/80 tracking-[0.5em] uppercase">
              Expertise
            </h4>
            <Sparkles size={16} className="text-primary/20" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar">
            {phase.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 + 0.2 }}
                className="flex items-start gap-3 text-sm text-card-foreground/80 group/item"
              >
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-card-foreground/40 group-hover/item:scale-150 group-hover/item:bg-card-foreground transition-all" />
                <span className="font-body leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-black/5">
             <p className="text-[10px] text-black/40 italic leading-snug">
          
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="bg-background section-padding py-24 md:py-40 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-8 tracking-tighter">
            Pushing the <span className="text-primary italic">Boundaries.</span>
          </h2>
          <p className="text-muted-foreground font-body text-xl max-w-2xl mx-auto leading-relaxed">
            From industrial engineering to digital transformation, we deliver bespoke solutions that redefine excellence.
          </p>
        </motion.div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {phases.map((phase, index) => (
            <CapabilityCard key={phase.title} phase={phase} index={index} />
          ))}
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-32 flex flex-col items-center"
        >
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent mb-8" />
          <p className="text-muted-foreground font-body mb-8 text-center italic">
            Looking for something specific? Let&apos;s build it together.
          </p>
          <a
            href="#contact"
            className="group relative px-12 py-5 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 text-primary-foreground font-display font-black text-xs tracking-[0.5em] uppercase">
              Start Project
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
