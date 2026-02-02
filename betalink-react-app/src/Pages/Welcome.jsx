import { useState, useEffect } from "react";
import logo2 from "../assets/logo2.png";
import bgimg1 from "../assets/bgimg1.jpg";

const Welcome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    /* ================= NAVBAR ================= */
    navbar: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      borderBottom: "1px solid #e5e5e5",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#fff",
      zIndex: 10,
    },

    leftGroup: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },

    logoImage: {
      height: "44px",
      width: "auto",
      objectFit: "contain",
    },

    centerSection: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      display: isMobile ? "none" : "flex",
      gap: "40px",
      fontSize: "14px",
      fontWeight: "500",
    },

    link: {
      cursor: "pointer",
      whiteSpace: "nowrap",
      paddingBottom: "4px",
      borderBottom: "2px solid transparent",
      transition: "border-bottom 0.3s ease",
    },

    rightGroup: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },

    login: {
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      border: "2px solid #000",
      padding: "8px 18px",
      borderRadius: "8px",
    },

    signup: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "10px 22px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "14px",
    },

    hamburger: {
      fontSize: "24px",
      cursor: "pointer",
      display: isMobile ? "block" : "none",
    },

    mobileMenu: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e5e5e5",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
    },

    /* ================= HERO ================= */
    heroSection: {
      position: "relative",
      width: "100%",
    },

    heroImage: {
      height: "600px",
      width: "100%",
      objectFit: "cover",
      display: "block",
    },

    heroOverlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.55)",
    },

    heroContent: {
      position: "absolute",
      top: "50%",
      left: isMobile ? "20px" : "60px",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: isMobile ? "16px" : "20px",
      maxWidth: isMobile ? "90%" : "720px",
      color: "#fff",
      zIndex: 2,
      fontFamily: "'Poppins', sans-serif",
    },

    heroTitle: {
      fontSize: isMobile ? "26px" : "48px",
      fontWeight: "700",
      lineHeight: "1.25",
      textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
    },

    heroSubtext: {
      fontSize: isMobile ? "15px" : "18px",
      fontWeight: "400",
      lineHeight: "1.6",
      color: "#e5e7eb",
      maxWidth: "640px",
    },

    heroButton: {
      marginTop: "12px",
      backgroundColor: "#000",
      color: "#fff",
      padding: isMobile ? "12px 28px" : "14px 32px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "600",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  const NavLinks = () =>
    ["Home", "Find Tester", "Find Developer", "About", "Contact"].map(
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
    );

  return (
    <>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.leftGroup}>
          <img src={logo2} alt="BetaLink Logo" style={styles.logoImage} />
        </div>

        <div style={styles.centerSection}>
          <NavLinks />
        </div>

        <div style={styles.rightGroup}>
          {!isMobile && (
            <>
              <div style={styles.login}>Log in</div>
              <div style={styles.signup}>Sign up</div>
            </>
          )}
          <div
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div style={styles.mobileMenu}>
        <NavLinks />
        <div style={styles.login}>Log in</div>
        <div style={styles.signup}>Sign up</div>
      </div>

      {/* HERO */}
      <div style={styles.heroSection}>
        <img src={bgimg1} alt="Hero" style={styles.heroImage} />
        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <div style={styles.heroTitle}>
            Build. Test. Launch — With Confidence.
          </div>

          <div style={styles.heroSubtext}>
            Launch better products by connecting with real users who test,
            report bugs, and give actionable feedback before you go live.
          </div>

          <button
            style={styles.heroButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#333";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
