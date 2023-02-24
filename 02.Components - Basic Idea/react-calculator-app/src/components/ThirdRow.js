import styles from './ThirdRow.module.css'

const ThirdRow = () => {
  return (
    <div className={styles.thirdRow}>
      <button className={styles.element}>1</button>
      <button className={styles.element}>2</button>
      <button className={styles.element}>3</button>
      <button className={styles.element}>-</button>
    </div>
  );
};

export default ThirdRow;
