import styles from "./Header.module.css";
import logo from "../images/pupmatch-logo.png";



export const Header = () => {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["div-container"]}>
        <img className={styles["img-logo"]} src={logo} alt="Pupmatch Logo" />
        <ul>
          <div className={styles["home-functionality"]}>
            <li>
              <a href="#">Home</a>
            </li>
          </div>
          <div className={styles["user-functionality"]}>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
};
