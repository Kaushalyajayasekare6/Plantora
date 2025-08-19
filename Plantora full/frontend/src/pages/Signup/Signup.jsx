import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from './Signup.module.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name.trim()) {
            alert("Name is required");
            return false;
        }
        if (name.trim().length < 2) {
            alert("Name must be at least 2 characters");
            return false;
        }
        if (!email.trim()) {
            alert("Email is required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
        if (!password.trim()) {
            alert("Password is required");
            return false;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return false;
        }
        if (!agreed) {
            alert("You must agree to the terms and policy");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        console.log("Signup data", { name, email, password, agreed });
        alert(`Welcome, ${name}! You have successfully joined us`);
        navigate('/home');
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>Get Started Now</h2>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${styles.input} ${styles.passwordInput}`}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <label htmlFor="terms" className={styles.termsLabel}>
                            I agree to the <a href="#" className={styles.termsLink}>terms & policy</a>
                        </label>
                    </div>

                    <button type="submit" className={styles.signupButton}>Sign Up</button>

                    <div className={styles.divider}>
                        <span className={styles.dividerText}>or</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button type="button" className={styles.googleButton}>
                            <FcGoogle className={styles.socialIcon} />
                            Sign up with Google
                        </button>
                        <button type="button" className={styles.appleButton}>
                            <FaApple className={styles.socialIcon} />
                            Sign up with Apple
                        </button>
                    </div>

                    <p className={styles.loginPrompt}>
                        Have an account? <Link to="/login" className={styles.loginLink}>Sign In</Link>
                    </p>
                </form>
            </div>
            
            <div className={styles.imageContainer}>
                <img src="/plant.jpg" alt="Decorative plant" className={styles.image} />
            </div>
        </div>
    );
}

export default Signup;