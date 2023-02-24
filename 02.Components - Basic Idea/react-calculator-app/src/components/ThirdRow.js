import styles from './ThirdRow.module.css'
import { onClickOne, onClickTwo, onClickThree, onClickSubtract } from "./Calculator";


const ThirdRow = () => {
  return (
    <div className={styles.thirdRow}>
      <button id="one" className={styles.element} onClick={onClickOne}>1</button>
      <button id="two" className={styles.element} onClick={onClickTwo}>2</button>
      <button id="three" className={styles.element} onClick={onClickThree}>3</button>
      <button id="subtract" className={styles.element} onClick={onClickSubtract}>-</button>
    </div>
  );
};

export default ThirdRow;
