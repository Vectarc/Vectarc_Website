import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const INITIAL_FORM = {
  inquiryType: "New Business",
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const ContactForm = ({ onSuccess, onError, className }: ContactFormProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        if (onError) onError(errorMsg);
        return;
      }

      toast.success(data.message || "Thank you! We'll be in touch shortly.");
      setFormData(INITIAL_FORM);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      const errorMsg = "Could not reach the server. Please check your connection and try again.";
      toast.error(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <select
        name="inquiryType"
        value={formData.inquiryType}
        onChange={handleChange}
        className={inputClass}
        disabled={isSubmitting}
      >
        <option>New Business</option>
        <option>General Inquiry</option>
        <option>Partnership</option>
      </select>
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="bg-card border-border"
        disabled={isSubmitting}
        required
      />
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="bg-card border-border"
        disabled={isSubmitting}
        required
      />
      <Input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="bg-card border-border"
        disabled={isSubmitting}
      />
      <Input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company Name"
        className="bg-card border-border"
        disabled={isSubmitting}
      />
      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="What's your idea, and how can we help?"
        rows={4}
        className="bg-card border-border resize-none"
        disabled={isSubmitting}
        required
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};

export default ContactForm;
