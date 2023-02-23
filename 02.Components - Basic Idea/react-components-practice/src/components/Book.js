import styles from "./Book.module.css";

const Book = (props) => {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={props.image} alt="" />
      <h3 className={styles.title}>{props.title}</h3>
      <p><span className={styles.bolded}>Year</span>: {props.year}</p>
      <p><span className={styles.bolded}>Author</span>: {props.author}</p>
    </article>
  );
};

export default Book;
