import styles from './FourthRow.module.css';
import { onClickZero, onClickAddition, onClickEqual } from "./Calculator";

const FourthRow = () => {
  return (
    <div className={styles.fourthRow}>
      <button id="zero" className={styles.element} onClick={onClickZero}>0</button>
      <button className={styles.element}>.</button>
      <button className={styles.element} onClick={onClickAddition}>+</button>
      <button className={styles.element} onClick={onClickEqual}>=</button>
    </div>
  );
};

export default FourthRow;
