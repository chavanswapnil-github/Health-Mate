// src/pages/About.jsx

import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Our Diet Planner</h1>

      <p style={styles.text}>
        Our Diet Planner application helps users maintain a healthy lifestyle by
        providing personalized diet plans based on their preferences. The system
        includes user registration, login, and an admin panel to manage users.
      </p>

      <p style={styles.text}>
        The platform is built using modern technologies like React for the
        front-end and Node.js or Flask for the backend. It ensures smooth
        navigation, easy tracking, and secure data handling.
      </p>

      <h2 style={styles.subheading}>Features</h2>
      <ul style={styles.list}>
        <li>User Registration & Login</li>
        <li>Admin Panel for User Management</li>
        <li>Create and View Diet Plans</li>
        <li>Modern and Responsive UI</li>
      </ul>

      <p style={styles.text}>
        Our goal is to help people stay fit, organized, and aware of their
        dietary habits using technology.
      </p>
    </div>
  );
};

const styles = {
  container: {
    margin: "40px auto",
    maxWidth: "900px",
    padding: "20px",
    lineHeight: "1.7",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "24px",
    marginTop: "25px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  list: {
    fontSize: "18px",
    paddingLeft: "20px",
  },
};

export default About;
