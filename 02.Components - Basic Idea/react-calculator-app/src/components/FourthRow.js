import styles from './FourthRow.module.css'

const FourthRow = () => {
  return (
    <div className={styles.fourthRow}>
      <button className={styles.element}>0</button>
      <button className={styles.element}>.</button>
      <button className={styles.element}>+</button>
      <button className={styles.element}>=</button>
    </div>
  );
};

export default FourthRow;
