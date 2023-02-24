import Elements from "./Elements";
import Screen from "./Screen";
import styles from './Calculator.module.css';

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <Screen />
      <Elements />
    </div>
  );
};

export default Calculator;
