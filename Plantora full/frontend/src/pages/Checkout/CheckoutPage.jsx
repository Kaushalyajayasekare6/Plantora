import React from "react";
import { useNavigate } from "react-router-dom"; // import navigate hook
import styles from "./CheckoutPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function CheckoutPage() {
  const navigate = useNavigate(); // initialize navigation

  // handlers
  const handleBack = () => {
    navigate("/products"); // change this route to your actual product page route
  };

  const handleConfirm = () => {
    navigate("/home"); // redirect to home page
  };

  return (
    <div className={styles.app}>
      <Navbar />

      {/* Page content wrapper with spacing */}
      <div className={styles.pageContainer}>
        <main className={styles.main}>
          <section className={styles.paymentSection}>
            <h1>Your Order is Completed</h1>

            <div className={styles.paymentMethod}>
              <span>Payment Method</span>
              <div>
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card">
                  <img
                    src="/Group 1000001772.png"
                    alt="Card Payment"
                    className={styles.paymentImg}
                  />
                </label>
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">
                  <img
                    src="/Group 1000001773.png"
                    alt="PayPal"
                    className={styles.paymentImg}
                  />
                </label>
              </div>
            </div>

            <div className={styles.paymentDetails}>
              <h2>Payment Details</h2>
              <input
                type="text"
                placeholder="Enter Name on Card"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Card Number"
                className={styles.input}
              />
              <div className={styles.cardInfo}>
                <input type="text" placeholder="Expiration" className={styles.input} />
                <input type="text" placeholder="CVV" className={styles.input} />
              </div>
              <p className={styles.terms}>
                By clicking "Confirm Payment", I agree to the company's terms of service.
              </p>
              <div className={styles.buttons}>
                <button onClick={handleBack} className={styles.backBtn}>
                  Back
                </button>
                <button onClick={handleConfirm} className={styles.confirmBtn}>
                  Confirm Payment $14.98
                </button>
              </div>
            </div>
          </section>

          <aside className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.item}>
              <img src="/plant1.png" alt="Artificial Plants" />
              <div>
                <p>Artificial Plants</p>
                <p>LKR 900.00</p>
                <p>Quantity: 1</p>
                <p>Total Price: 900.00</p>
              </div>
            </div>
            <div className={styles.item}>
              <img src="/plant2.png" alt="Artificial Plants" />
              <div>
                <p>Artificial Plants</p>
                <p>LKR 1200.00</p>
                <p>Quantity: 1</p>
                <p>Total Price: 1200.00</p>
              </div>
            </div>
            <div className={styles.subtotal}>
              <h3>Sub Total</h3>
              <p>2100.00</p>
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
