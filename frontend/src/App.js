import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Salad, Apple, Activity } from "lucide-react";

import Navbar from "./components/Navbar";
import HealthyLivingSection from "./components/HealthyLivingSection";
import NutritionSection from "./components/NutritionSection";
import Footer from "./components/Footer";
import DietPlanPage from "./components/DietPlanPage";
import BMICalculator from "./components/BMICalculator";
import Chatbot from "./components/Chatbot";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import UsersList from "./pages/UsersList";
import UserHistory from "./pages/UserHistory";

import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const HomePage = () => (
  <main className="container py-4">
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-5"
    >
      <motion.h1
        className="display-3 fw-bold text-success mb-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Journey to a Healthier Life
      </motion.h1>
      <p className="lead text-secondary mx-auto" style={{ maxWidth: "700px" }}>
        Discover personalized nutrition plans, expert advice, and tools to help
        you achieve your health goals.
      </p>
    </motion.section>

    <motion.div
      className="row g-4 my-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, staggerChildren: 0.2 }}
    >
      {[
        { icon: Heart, title: "Heart Health", color: "text-danger" },
        { icon: Salad, title: "Balanced Diet", color: "text-success" },
        { icon: Apple, title: "Fresh Foods", color: "text-warning" },
        { icon: Activity, title: "Active Living", color: "text-primary" },
      ].map((feature, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} className="col-md-6 col-lg-3">
          <div className="card shadow text-center p-4 h-100">
            <feature.icon className={`${feature.color} mx-auto mb-3`} size={48} />
            <h3 className="fs-5 fw-semibold">{feature.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <HealthyLivingSection />
    <NutritionSection />
  </main>
);

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Navbar />

        <Routes>
          {/* Public pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/diet-plan" element={<DietPlanPage />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/about" element={<About />} />

          {/* User Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<UsersList />} />
            <Route path="user/:id/history" element={<UserHistory />} />
          </Route>
        </Routes>

        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
