import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return React.createElement(
    "footer",
    { className: "bg-success text-white py-5" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row gy-4" },
        // Column 1
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            motion.div,
            {
              className: "d-flex align-items-center mb-3",
              whileHover: { scale: 1.05 },
            },
            React.createElement(Heart, { size: 24, className: "me-2" }),
          React.createElement(
  "span",
  { className: "fs-4 fw-bold" },
  "HealthMate by Swapnil"
)
          ),
          React.createElement(
            "p",
            { className: "text-light" },
            "Your trusted partner in health and wellness. Join us on the journey to a healthier you."
          )
        ),

        // Column 2
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            "h3",
            { className: "fs-5 fw-semibold mb-3" },
            "Quick Links"
          ),
          React.createElement(
            "ul",
            { className: "list-unstyled" },
            ["About Us", "Services", "Resources", "Blog"].map((item) =>
              React.createElement(
                motion.li,
                {
                  key: item,
                  className: "mb-2",
                  whileHover: { x: 5 },
                },
                React.createElement(
                  "a",
                  {
                    href: "#",
                    className: "text-light text-decoration-none",
                  },
                  item
                )
              )
            )
          )
        ),

        // Column 3
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            "h3",
            { className: "fs-5 fw-semibold mb-3" },
            "Contact"
          ),
          React.createElement(
            "ul",
            { className: "list-unstyled" },
            React.createElement(
              "li",
              { className: "d-flex align-items-center mb-3" },
              React.createElement(Mail, {
                size: 20,
                className: "text-light me-2",
              }),
              React.createElement("span", {}, "swapnilc983@gmail.com")
            ),
            React.createElement(
              "li",
              { className: "d-flex align-items-center mb-3" },
              React.createElement(Phone, {
                size: 20,
                className: "text-light me-2",
              }),
              React.createElement("span", {}, "+91 9145741214")
            ),
            React.createElement(
              "li",
              { className: "d-flex align-items-center mb-3" },
              React.createElement(MapPin, {
                size: 20,
                className: "text-light me-2",
              }),
             React.createElement(
  "span",
  {},
  "Nashik, Maharashtra, India"
)
            )
          )
        ),

        // Column 4
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            "h3",
            { className: "fs-5 fw-semibold mb-3" },
            "Newsletter"
          ),
          React.createElement(
            "p",
            { className: "text-light mb-3" },
            "Subscribe to our newsletter for health tips and updates."
          ),
          React.createElement(
            "form",
            { className: "mb-3" },
            React.createElement("input", {
              type: "email",
              placeholder: "Enter your email",
              className: "form-control bg-success-light text-white mb-2",
              style: { backgroundColor: "rgba(255,255,255,0.2)" },
            }),
            React.createElement(
              motion.button,
              {
                whileHover: { scale: 1.05 },
                className: "btn btn-light text-success w-100",
              },
              "Subscribe"
            )
          )
        )
      ),

      // Copyright
      React.createElement(
        "div",
        {
          className:
            "mt-4 pt-3 border-top border-success-light text-center text-light",
        },
        React.createElement("p", {}, " 2026 HealthMate .")
      )
    )
  );
};

export default Footer;
