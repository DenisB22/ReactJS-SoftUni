import styles from './Elements.module.css'
import FirstRow from './FirstRow';
import FourthRow from './FourthRow';
import SecondRow from './SecondRow';
import ThirdRow from './ThirdRow';

const Elements = () => {
  return (
    <div className={styles.elements}>
      <FirstRow />
      <SecondRow />
      <ThirdRow />
      <FourthRow />
    </div>
  );
};

export default Elements;
