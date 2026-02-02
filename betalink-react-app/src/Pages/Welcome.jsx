import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Welcome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    navbar: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      borderBottom: "1px solid #e5e5e5",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#fff",
    },

    leftGroup: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },

    hamburger: {
      fontSize: "24px",
      cursor: "pointer",
      display: isMobile ? "block" : "none",
      marginLeft: "auto",
    },

    rightGroup: {
      display: "flex",
      alignItems: "center",
      gap: "30px",
    },

    logoImage: {
      height: "44px", // visible & premium
      width: "auto",
      objectFit: "contain",
    },

    centerSection: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      display: isMobile ? "none" : "flex",
      gap: "45px",
      fontSize: "14px",
    },

    link: {
      cursor: "pointer",
      whiteSpace: "nowrap",
      paddingBottom: "4px",
    },

    rightSection: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "30px",
      fontSize: "14px",
    },

    login: {
      cursor: "pointer",
      fontWeight: "600",
    },

    signup: {
      backgroundColor: "#14a800",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "10px",
      fontWeight: "600",
      cursor: "pointer",
    },

    mobileMenu: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      gap: "18px",
      padding: "20px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e5e5e5",
      fontSize: "14px",
    },
  };

  const NavLinks = () => (
    <>
      {["Home", "Find Tester", "Find Developer", "About", "Contact"].map(
        (item) => (
          <div
            key={item}
            style={styles.link}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderBottom = "2px solid #000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderBottom = "2px solid transparent")
            }
          >
            {item}
          </div>
        )
      )}
    </>
  );

  return (
    <>
      {/* Navbar */}
      <div style={styles.navbar}>
        {/* Left */}
        <div style={styles.leftGroup}>
          <img
            src={logo}
            alt="BetaLink Logo"
            style={styles.logoImage}
          />
        </div>

        {/* Center (Desktop) */}
        <div style={styles.centerSection}>
          <NavLinks />
        </div>

        {/* Right (Desktop) */}
        <div style={styles.rightGroup}>
          <div style={styles.rightSection}>
            <div style={styles.login}>Log in</div>
            <div style={styles.signup}>Sign up</div>
          </div>
          <div
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div style={styles.mobileMenu}>
        <NavLinks />
        <div style={styles.login}>Log in</div>
        <div style={styles.signup}>Sign up</div>
      </div>
    </>
  );
};

export default Welcome;
