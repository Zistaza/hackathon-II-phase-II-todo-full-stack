'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/ui/feature-card';
import { FiCheckCircle, FiLock, FiCloud, FiZap } from 'react-icons/fi';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Intuitive interface to create, organize, and track your tasks with due dates and priorities.',
      icon: <FiCheckCircle className="h-8 w-8" aria-hidden="true" />,
    },
    {
      title: 'Secure Login',
      description: 'Enterprise-grade authentication with secure storage of your personal data and privacy protection.',
      icon: <FiLock className="h-8 w-8" aria-hidden="true" />,
    },
    {
      title: 'Cloud Sync',
      description: 'Access your tasks from anywhere, with real-time synchronization across all your devices.',
      icon: <FiCloud className="h-8 w-8" aria-hidden="true" />,
    },
    {
      title: 'Fast & Responsive',
      description: 'Lightning-fast performance with smooth animations and a responsive design that works on all devices.',
      icon: <FiZap className="h-8 w-8" aria-hidden="true" />,
    },
  ];

  return (
    <section className="w-full max-w-5xl mb-16 relative" aria-labelledby="features-heading">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary/5 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          id="features-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
        >
          Powerful Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Everything you need to stay organized and boost your productivity
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        role="list"
        aria-label="Application features"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            whileHover={{ y: -10 }}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;