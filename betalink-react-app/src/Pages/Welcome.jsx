const Navbar = () => {
  const styles = {
    navbar: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 32px",
      borderBottom: "1px solid #e5e5e5",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#000",
      cursor: "pointer",
    },
    centerSection: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "45px",
      fontSize: "14px",
      color: "#000",
    },
    link: {
      cursor: "pointer",
      whiteSpace: "nowrap",
      position: "relative",
      paddingBottom: "4px",
      transition: "all 0.3s ease",
    },
    linkHover: {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "2px",
      backgroundColor: "#000",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
      fontSize: "14px",
    },
    login: {
      cursor: "pointer",
      color: "#000",
      backgroundColor: "transparent",
      padding: "10px 20px",
      borderRadius: "10px",
      fontWeight: "600",
      borderStyle: "solid",
    },
    signup: {
      backgroundColor: "#14a800",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "10px",
      fontWeight: "600",
      cursor: "pointer",
      borderStyle: "solid",
    },
  };

  return (
    <div style={styles.navbar}>
      {/* Left */}
      <div style={styles.logo}>BetaLink</div>

      {/* Center */}
      <div style={styles.centerSection}>
        <div 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottom = "2px solid #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottom = "2px solid transparent";
          }}
        >
          Home
        </div>
        <div 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottom = "2px solid #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottom = "2px solid transparent";
          }}
        >
          Find Tester
        </div>
        <div 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottom = "2px solid #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottom = "2px solid transparent";
          }}
        >
          Find Developer
        </div>
        <div 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottom = "2px solid #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottom = "2px solid transparent";
          }}
        >
          About
        </div>
        <div 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottom = "2px solid #000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottom = "2px solid transparent";
          }}
        >
          Contact
        </div>
      </div>

      {/* Right */}
      <div style={styles.rightSection}>
        <div style={styles.login}>Log in</div>
        <div style={styles.signup}>Sign up</div>
      </div>
    </div>
  );
};

export default Navbar;
