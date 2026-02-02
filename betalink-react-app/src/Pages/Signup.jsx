import { useState, useEffect, } from "react";
import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const Signup = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();
    // Determine initial mode based on URL path
    const [isSignUpMode, setIsSignUpMode] = useState(location.pathname === "/signup");

    useEffect(() => {
        setIsSignUpMode(location.pathname === "/signup");
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "tester",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signup submitted:", formData);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", loginData);
    };

    const toggleMode = () => {
        setIsSignUpMode(!isSignUpMode);
    };

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#f0f2f5",
            overflow: "hidden",
            position: "relative",
        },
        // The main card that holds everything
        card: {
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0 14px 28px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.08)",
            position: "relative",
            overflow: "hidden",
            width: isMobile ? "100%" : "900px",
            maxWidth: "100%",
            minHeight: isMobile ? "100vh" : "600px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
        },
        // Forms container (Left/Right sliding area)
        formContainer: {
            position: "absolute",
            top: 0,
            height: "100%",
            transition: "all 0.6s ease-in-out",
            width: isMobile ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            backgroundColor: "#fff",
            zIndex: 2,
        },
        signUpContainer: {
            left: 0,
            opacity: isSignUpMode ? 1 : 0,
            zIndex: isSignUpMode ? 5 : 1,
            // Mobile: Slide vertically. Desktop: Stay fixed on Left (Opacity handles visibility under overlay)
            transform: isMobile
                ? (isSignUpMode ? "translateY(0)" : "translateY(-100%)")
                : "translateX(0)",
            filter: isSignUpMode ? "blur(0)" : "blur(5px)",
        },
        loginContainer: {
            // Mobile: left 0. Desktop: left 50%
            left: isMobile ? 0 : "50%",
            opacity: !isSignUpMode ? 1 : 0,
            zIndex: !isSignUpMode ? 5 : 1,
            // Mobile: Slide vertically. Desktop: Stay fixed on Right
            transform: isMobile
                ? (!isSignUpMode ? "translateY(0)" : "translateY(100%)")
                : "translateX(0)",
            filter: !isSignUpMode ? "blur(0)" : "blur(5px)",
        },

        // Overlay Container (The Sliding Panel)
        overlayContainer: {
            position: "absolute",
            top: 0,
            left: "50%",
            width: "50%",
            height: "100%",
            overflow: "hidden",
            transition: "transform 0.6s ease-in-out",
            zIndex: 100,
            // Signup Mode: Overlay on Right (translateX(0)). Login Mode: Overlay on Left (translateX(-100%)).
            transform: isSignUpMode ? "translateX(0)" : "translateX(-100%)",
            display: isMobile ? "none" : "block",
        },
        overlay: {
            backgroundColor: "#000",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "0 0",
            color: "#ffffff",
            position: "relative",
            left: "-100%",
            height: "100%",
            width: "200%",
            transform: isSignUpMode ? "translateX(0)" : "translateX(50%)",
            transition: "transform 0.6s ease-in-out",
            display: "flex",
            flexDirection: "row",
        },
        overlayPanel: {
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "0 40px",
            textAlign: "center",
            top: 0,
            height: "100%",
            width: "50%",
            transform: "translateX(0)",
            transition: "transform 0.6s ease-in-out",
        },
        overlayLeft: {
            transform: isSignUpMode ? "translateX(-20%)" : "translateX(0)",
            left: 0,
            display: 'flex', flexDirection: 'column',
        },
        overlayRight: {
            right: 0,
            transform: isSignUpMode ? "translateX(0)" : "translateX(20%)",
            display: 'flex', flexDirection: 'column',
        },

        // Shared Elements
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: "12px",
        },
        header: {
            fontWeight: "bold",
            margin: "0 0 20px 0",
            color: "#000",
        },
        input: {
            backgroundColor: "#eee",
            border: "none",
            padding: "12px 15px",
            fontSize: "14px",
            margin: "8px 0",
            width: "100%",
            borderRadius: "4px",
            outline: "none",
        },
        button: {
            borderRadius: "20px",
            border: "1px solid #000",
            backgroundColor: "#000",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "12px 45px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "transform 80ms ease-in",
            cursor: "pointer",
            marginTop: "10px",
            width: "fit-content",
            alignSelf: "center",
        },
        ghostButton: {
            backgroundColor: "transparent",
            borderColor: "#ffffff",
            borderWidth: "1px",
            borderStyle: "solid",
            color: "#fff",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "12px 45px",
            cursor: "pointer",
            textTransform: "uppercase",
            marginTop: "20px",
        },
        select: {
            backgroundColor: "#eee",
            border: "none",
            padding: "12px 15px",
            margin: "8px 0",
            width: "100%",
            borderRadius: "4px",
        },
        mobileToggle: {
            marginTop: "20px",
            color: "#000",
            cursor: "pointer",
            textDecoration: "underline",
            display: isMobile ? "block" : "none",
        },
        logo: {
            height: "40px",
            width: "auto",
            marginBottom: "20px",
            objectFit: "contain",
            maxWidth: "150px", // Constrain width to prevent expansion
        },
        bottomLink: {
            marginTop: "16px",
            fontSize: "12px",
            color: "#666",
            textDecoration: "none",
            cursor: "pointer",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* SIGN UP FORM (Visible by default - LEFT SIDE) */}
                <div style={{ ...styles.formContainer, ...styles.signUpContainer }}>
                    <form style={styles.form} onSubmit={handleSignupSubmit}>
                        <img src={logo2} alt="BetaLink Logo" style={styles.logo} />
                        <h1 style={styles.header}>Create Account</h1>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            style={styles.input}
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            style={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="role"
                            style={styles.select}
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="client">Client</option>
                            <option value="developer">Developer / Tester</option>
                        </select>

                        <button style={styles.button} type="submit">Sign Up</button>

                        {/* Mobile Only Switch */}
                        <div style={styles.mobileToggle} onClick={toggleMode}>
                            Already have an account? Sign In
                        </div>

                        <Link to="/" style={styles.bottomLink}>
                            Return to home
                        </Link>
                    </form>
                </div>

                {/* LOGIN FORM (Hidden/Blurred/Slided - RIGHT SIDE) */}
                <div style={{ ...styles.formContainer, ...styles.loginContainer }}>
                    <form style={styles.form} onSubmit={handleLoginSubmit}>
                        <img src={logo2} alt="BetaLink Logo" style={styles.logo} />
                        <h1 style={styles.header}>Sign in</h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            style={styles.input}
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                        <button style={styles.button} type="submit">Sign In</button>

                        {/* Mobile Only Switch */}
                        <div style={styles.mobileToggle} onClick={toggleMode}>
                            New here? Sign Up
                        </div>

                        <Link to="/" style={styles.bottomLink}>
                            Return to home
                        </Link>
                    </form>
                </div>

                {/* OVERLAY CONTAINER (Desktop Animation) */}
                <div style={styles.overlayContainer}>
                    <div style={styles.overlay}>

                        {/* OVERLAY LEFT (Visible when Login Mode is active -> Covers Signup)
                Shows: "Hello, Friend!" -> "Sign Up" button.
            */}
                        <div style={{ ...styles.overlayPanel, ...styles.overlayLeft }}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button style={styles.ghostButton} onClick={toggleMode}>
                                Sign Up
                            </button>
                        </div>

                        {/* OVERLAY RIGHT (Visible when Signup Mode is active -> Covers Login)
                Shows: "Welcome Back!" -> "Sign In" button.
            */}
                        <div style={{ ...styles.overlayPanel, ...styles.overlayRight }}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button style={styles.ghostButton} onClick={toggleMode}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;