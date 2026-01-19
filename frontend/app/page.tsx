'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/home/hero-section';
import FeaturesSection from '@/components/home/features-section';
import AuthSection from '@/components/home/auth-section';
import ThemeToggle from '@/components/ui/theme-toggle';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header with theme toggle */}
      <header className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <HeroSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-5xl my-12"
          >
            <FeaturesSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-md"
          >
            <AuthSection />
          </motion.div>
        </motion.div>
      </main>

      {/* Floating particles for extra animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full bg-primary/20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
