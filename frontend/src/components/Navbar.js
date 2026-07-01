import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u);
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Smart BMI Calculator", link: "/bmi-calculator" },
    { name: "Diet Plan", link: "/diet-plan" },
    { name: "About", link: "/about" },
  ];

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <motion.div className="d-flex align-items-center" whileHover={{ scale: 1.05 }}>
            <Heart className="me-2" size={32} color="#198754" />
            <span className="navbar-brand fw-bold text-success">HealthMate</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="d-none d-md-flex align-items-center">
            {navItems.map((item) => (
              <motion.div whileHover={{ scale: 1.1 }} key={item.name}>
                <Link to={item.link} className="nav-link mx-3 text-secondary">
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {!user ? (
              <>
                <Link to="/register" className="btn btn-outline-success ms-3">Register</Link>
                <Link to="/login" className="btn btn-success ms-3">Login</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn btn-outline-primary ms-3">Profile</Link>
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="d-md-none">
            <button onClick={() => setIsOpen(!isOpen)} className="btn btn-link text-secondary border-0">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="d-md-none py-3">
            {navItems.map((item) => (
              <Link key={item.name} to={item.link} className="d-block py-2 text-secondary" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link to="/register" className="d-block py-2 text-secondary" onClick={() => setIsOpen(false)}>Register</Link>
                <Link to="/login" className="d-block py-2 text-secondary" onClick={() => setIsOpen(false)}>Login</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="d-block py-2 text-secondary" onClick={() => setIsOpen(false)}>Profile</Link>
                <button className="btn btn-danger w-100 mt-3" onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
