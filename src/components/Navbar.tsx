import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Services", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 section-padding ${
      scrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-2xl" : "py-8 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#" 
          className="flex items-center gap-3 font-display text-3xl font-black tracking-tighter group relative text-foreground"
        >
          <img src={logo} alt="VECTARC Logo" className="h-10 w-auto object-contain" />
          <div className="relative">
            <span className="relative z-10 uppercase">VECTARC</span>
            <motion.div 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
            />
          </div>
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                href={link.href}
                className="group text-[13px] font-display font-black uppercase tracking-[0.3em] transition-all flex flex-col text-foreground/70 hover:text-foreground"
              >
                <span>{link.label}</span>
                <span className="h-px w-0 group-hover:w-full bg-primary transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            href="#contact"
            className="text-[10px] font-display font-black tracking-[0.4em] uppercase bg-primary text-primary-foreground px-8 py-3.5 rounded-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            Connect
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu (Sidebar/Drawer) - MOVED OUTSIDE PADDING FOR FIXED POSITIONING */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            
            {/* Floating Sidebar Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 w-[75%] max-w-[280px] bg-card border border-primary/10 z-[70] md:hidden shadow-2xl p-8 pt-16 flex flex-col gap-6 rounded-3xl"
            >
              {/* Close Button Inside Sidebar */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-foreground/60 hover:text-foreground"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    href={link.href}
                    onClick={() => setTimeout(() => setIsOpen(false), 200)}
                    className="text-2xl font-display font-black tracking-tight text-foreground hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setTimeout(() => setIsOpen(false), 200)}
                className="mt-2 text-center py-5 bg-primary text-primary-foreground font-display font-black text-[10px] tracking-[0.4em] uppercase rounded-xl"
              >
                Connect
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
