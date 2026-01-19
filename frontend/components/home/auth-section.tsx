'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/ui/animated-button';

const AuthSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full max-w-md relative" aria-labelledby="auth-section-heading">
      <h2 id="auth-section-heading" className="sr-only">Authentication Options</h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        role="group"
        aria-labelledby="auth-section-heading"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <AnimatedButton
            variant="default"
            onClick={() => router.push('/register')}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-lg"
            aria-label="Get started with registration"
          >
            Get Started
          </AnimatedButton>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <AnimatedButton
            variant="outline"
            onClick={() => router.push('/login')}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-lg"
            aria-label="Sign in to your account"
          >
            Sign In
          </AnimatedButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-muted-foreground" id="auth-description">
          Join thousands of productive users managing their tasks efficiently
        </p>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default AuthSection;