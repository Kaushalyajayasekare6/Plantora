import { CartProvider } from "../../context/CartContext";
import CartTable from "../../components/Carttable";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Cart.module.css";

function CartContent() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      {/* Navbar at the top */}
      <Navbar />

      <section className={styles.cartPage}>
        <div className={styles.container}>
          <CartTable />

          <div className={styles.cartActions}>
            {/* Checkout button aligned to the left */}
            <button
              className={styles.checkoutBtn}
              type="button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </section>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default function Cart() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
