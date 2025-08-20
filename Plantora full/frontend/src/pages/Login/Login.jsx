import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Email is required");
            return;
        }
        if (!password.trim()) {
            alert("Password is required");
            return;
        }

        console.log(`Logged in with: ${email}`);
        navigate('/home');
    };

    function login(){
        console.log(email, password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)

                // const token = localStorage.getItem("token")
                toast.success("login successful")
                if(response.data.role == "admin"){

                    //window.location.href = "/admin"
                    navigate("/admin")

                }else if(response.data.role == "user"){

                    //window.location.href = "/"
                    navigate("/")

                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>Welcome back!</h2>
                    <p className={styles.subtitle}>Enter your credentials to access your account</p>

                    <div className={styles.inputGroup}>
                        <label htmlFor='email' className={styles.label}>Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.passwordHeader}>
                            <label htmlFor='password' className={styles.label}>Password</label>
                            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
                        </div>
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Input password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                required
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

                    <div className={styles.rememberMe}>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <label htmlFor="remember" className={styles.rememberLabel}>Remember for 30 days</label>
                    </div>

                    <button type="submit" className={styles.loginButton}>Login</button>

                    <div className={styles.divider}>
                        <span className={styles.dividerText}>or</span>
                    </div>

                    <button type="button" className={styles.googleButton}>
                        <FcGoogle className={styles.googleIcon} />
                        Sign in with Google
                    </button>

                    <p className={styles.signUpText}>
                        Don't have an account? <Link to="/signup" className={styles.signUpLink}>Sign Up</Link>
                    </p>
                </form>
            </div>
            <div className={styles.imageContainer}>
                <img src="/plant1.jpg" alt="Decorative plant" className={styles.image} />
            </div>
        </div>
    );
}

export default Login;