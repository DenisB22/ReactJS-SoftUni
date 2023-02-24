import styles from './SecondRow.module.css'

const SecondRow = () => {
  return (
    <div className={styles.secondRow}>
      <button className={styles.element}>4</button>
      <button className={styles.element}>5</button>
      <button className={styles.element}>6</button>
      <button className={styles.element}>×</button>
    </div>
  );
};

export default SecondRow;
