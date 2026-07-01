"use client"

import React from "react"
import { motion } from "framer-motion"
import { Leaf, Heart, Brain } from "lucide-react"

const NutritionSection = () => {
  const benefits = [
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "Focus on whole, unprocessed foods for optimal nutrition",
    },
    {
      icon: Heart,
      title: "Heart Health",
      description: "Support cardiovascular health with the right diet",
    },
    {
      icon: Brain,
      title: "Mental Clarity",
      description: "Boost cognitive function through proper nutrition",
    },
  ]

  return React.createElement(
    "section",
    { className: "py-5" },
    React.createElement(
      "div",
      { className: "text-center mb-5" },
      React.createElement(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          className: "display-5 fw-bold text-success mb-3",
        },
        "Nutrition That Makes a Difference",
      ),
      React.createElement(
        "p",
        { className: "text-secondary mx-auto", style: { maxWidth: "700px" } },
        "Discover how proper nutrition can transform your health and wellbeing.",
      ),
    ),

    React.createElement(
      "div",
      { className: "row g-4" },
      benefits.map((benefit, index) =>
        React.createElement(
          motion.div,
          {
            key: index,
            className: "col-md-4",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: index * 0.2 },
            whileHover: { scale: 1.05 },
          },
          React.createElement(
            "div",
            { className: "card shadow h-100 p-4" },
            React.createElement(benefit.icon, {
              className: "text-success mb-3",
              size: 48,
            }),
            React.createElement("h3", { className: "fs-4 fw-semibold text-dark mb-2" }, benefit.title),
            React.createElement("p", { className: "text-secondary" }, benefit.description),
          ),
        ),
      ),
    ),
  )
}

export default NutritionSection
