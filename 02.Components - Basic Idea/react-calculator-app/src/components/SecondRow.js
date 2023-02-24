import styles from './SecondRow.module.css'
import { onClickFour, onClickFive, onClickSix, onClickMultiply } from "./Calculator";

const SecondRow = () => {
  return (
    <div className={styles.secondRow}>
      <button id="four" className={styles.element} onClick={onClickFour}>4</button>
      <button id="five" className={styles.element} onClick={onClickFive}>5</button>
      <button id="six" className={styles.element} onClick={onClickSix}>6</button>
      <button id="multiply" className={styles.element} onClick={onClickMultiply}>×</button>
    </div>
  );
};

export default SecondRow;
