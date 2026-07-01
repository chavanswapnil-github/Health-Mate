import React from "react";
import { motion } from "framer-motion";

const HealthyLivingSection = () => {
  return React.createElement(
    "section",
    { className: "py-5" },
    React.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "card shadow border-0 overflow-hidden",
      },
      React.createElement(
        "div",
        { className: "row g-0" },
        React.createElement(
          "div",
          { className: "col-md-6 p-4 p-md-5" },
          React.createElement(
            "h2",
            { className: "display-6 fw-bold text-success mb-4" },
            "Embrace Healthy Living"
          ),
          React.createElement(
            "p",
            { className: "text-secondary mb-4" },
            "Start your journey to a healthier lifestyle with our comprehensive guides and expert advice. We're here to support you every step of the way."
          ),
          React.createElement(
            "ul",
            { className: "list-unstyled" },
            [
              "Personalized nutrition plans",
              "Expert health guidance",
              "Daily wellness tips",
              "Community support",
            ].map((item, index) =>
              React.createElement(
                motion.li,
                {
                  key: index,
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { delay: index * 0.2 },
                  className: "d-flex align-items-center mb-3",
                },
                React.createElement("div", {
                  className: "bg-success rounded-circle me-2",
                  style: { width: "8px", height: "8px" },
                }),
                React.createElement("span", { className: "text-dark" }, item)
              )
            )
          )
        ),
        React.createElement(
          "div",
          {
            className: "col-md-6 position-relative",
            style: { minHeight: "300px" },
          },
          React.createElement("img", {
            src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
            alt: "Healthy Living",
            className: "position-absolute w-100 h-100",
            style: { objectFit: "cover" },
          })
        )
      )
    )
  );
};

export default HealthyLivingSection;
