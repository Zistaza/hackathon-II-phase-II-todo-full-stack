'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/ui/animated-button';

const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full max-w-4xl text-center mb-16" aria-labelledby="hero-title">
      {/* Animated decorative elements */}
      <motion.div
        className="absolute left-10 top-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute right-10 bottom-10 w-16 h-16 rounded-full bg-secondary/10 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 relative"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block mb-4"
        >
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
        </motion.div>

        <h1
          id="hero-title"
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            STREAMLINE
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl"
          >
            YOUR TASKS
          </motion.span>
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          aria-describedby="hero-description"
        >
          A powerful, intuitive todo application designed to boost your productivity and help you achieve your goals.
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        role="group"
        aria-label="Authentication options"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatedButton
            variant="default"
            onClick={() => router.push('/register')}
            className="px-8 py-4 text-lg font-semibold rounded-lg"
            aria-label="Get started with registration"
          >
            Get Started
          </AnimatedButton>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatedButton
            variant="outline"
            onClick={() => router.push('/login')}
            className="px-8 py-4 text-lg font-semibold rounded-lg"
            aria-label="Sign in to your account"
          >
            Sign In
          </AnimatedButton>
        </motion.div>
      </motion.div>

      {/* Animated floating elements */}
      <div className="relative mt-12">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:block"
            style={{
              left: `${(i * 25) + 10}%`,
              top: `${(i * 20) + 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary/30"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;