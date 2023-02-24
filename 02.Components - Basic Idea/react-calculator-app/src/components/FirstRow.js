import styles from "./FirstRow.module.css";
import { onClickSeven, onClickEight, onClickNine, onClickDivide } from "./Calculator";

const FirstRow = () => {
  return (
    <div className={styles.firstRow}>
      <button id="seven" className={styles.element} onClick={onClickSeven}>
        7
      </button>
      <button id="eight" className={styles.element} onClick={onClickEight}>
        8
      </button>
      <button id="nine" className={styles.element} onClick={onClickNine}>
        9
      </button>
      <button id="divide" className={styles.element} onClick={onClickDivide}>
        ÷
      </button>
    </div>
  );
};

export default FirstRow;
