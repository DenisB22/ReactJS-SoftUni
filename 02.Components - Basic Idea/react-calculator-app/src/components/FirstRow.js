import styles from './FirstRow.module.css';

const FirstRow = () => {
  return (
    <div className={styles.firstRow}>
      <button className={styles.element}>7</button>
      <button className={styles.element}>8</button>
      <button className={styles.element}>9</button>
      <button className={styles.element}>÷</button>
    </div>
  );
};

export default FirstRow;