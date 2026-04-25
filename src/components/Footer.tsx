import { Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-background section-padding py-8 border-t border-border/30"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-body">
          VECTARC © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-5">
          {[
            { icon: Instagram, label: "Instagram", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Mail, label: "Email", href: "mailto:infovectarc@gmail.com" },
          ].map(({ icon: Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
