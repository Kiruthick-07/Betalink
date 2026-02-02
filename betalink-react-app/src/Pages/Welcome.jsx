import React from "react";
import heroImage from "../Template/image.png";

export default function App() {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>betalink</h2>
        <div style={styles.navLinks}>
          <span style={styles.navLink}>How it works</span>
          <span style={styles.navLink}>For Developers</span>
          <span style={styles.navLink}>For Testers</span>
          <span style={styles.navLink}>Pricing</span>
          <span style={styles.navLink}>For enterprise</span>
        </div>
        <div style={styles.navButtons}>
          <button style={styles.loginBtn}>Log in</button>
          <button style={styles.signupBtn}>Sign up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Connecting businesses<br />
              in need to freelancers<br />
              who deliver
            </h1>

            {/* Search / Action Box */}
            <div style={styles.searchBox}>
              <div style={styles.tabContainer}>
                <button style={styles.tabActive}>Find talent</button>
                <button style={styles.tab}>Browse jobs</button>
              </div>

              <div style={styles.searchRow}>
                <input
                  type="text"
                  placeholder="Search by role, skills, or keywords"
                  style={styles.searchInput}
                />
                <button style={styles.searchBtn}>
                  <span style={styles.searchIcon}>🔍</span> Search
                </button>
              </div>

              {/* Trusted by */}
              <div style={styles.trustedBy}>
                <span style={styles.companyLogo}>Microsoft</span>
                <span style={styles.companyLogo}>airbnb</span>
                <span style={styles.companyLogo}>GE</span>
                <span style={styles.companyLogo}>GLASSDOOR</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
    margin: 0,
    padding: 0,
    width: "100%",
    overflow: "hidden",
  },

  /* Navbar */
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1f1f1f",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    fontSize: "16px",
    alignItems: "center",
  },
  navLink: {
    color: "#5e6d55",
    cursor: "pointer",
    fontWeight: "400",
  },
  navButtons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  loginBtn: {
    background: "transparent",
    border: "none",
    color: "#1f1f1f",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  signupBtn: {
    background: "#14a800",
    border: "none",
    color: "#ffffff",
    padding: "10px 24px",
    borderRadius: "24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  /* Hero */
  hero: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  heroContainer: {
    backgroundColor: "rgba(0,0,0,0.15)",
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    padding: "60px 80px",
    width: "100%",
  },
  heroContent: {
    maxWidth: "700px",
  },
  heroTitle: {
    fontSize: "64px",
    fontWeight: "500",
    lineHeight: "1.15",
    color: "#ffffff",
    marginBottom: "40px",
    letterSpacing: "-0.5px",
  },

  /* Search box */
  searchBox: {
    backgroundColor: "rgba(40,40,40,0.85)",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "600px",
    backdropFilter: "blur(10px)",
  },
  tabContainer: {
    display: "flex",
    gap: "0",
    marginBottom: "24px",
  },
  tabActive: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    borderBottom: "2px solid #ffffff",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    background: "none",
  },
  tab: {
    backgroundColor: "transparent",
    color: "#a0a0a0",
    border: "none",
    borderBottom: "2px solid transparent",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  searchRow: {
    display: "flex",
    gap: "0",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    padding: "16px 24px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
  },
  searchBtn: {
    backgroundColor: "#14a800",
    border: "none",
    color: "#ffffff",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "0 28px 28px 0",
  },
  searchIcon: {
    fontSize: "18px",
  },

  /* Trusted by */
  trustedBy: {
    marginTop: "32px",
    display: "flex",
    gap: "40px",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  companyLogo: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    opacity: 0.7,
    letterSpacing: "0.5px",
  },
};
