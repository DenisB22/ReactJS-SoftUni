import Book from "./Book";
import styles from "./BookList.module.css";

const BookList = (props) => {
  return (
    <div>
      <h1>Book List</h1>
      <div className={styles.cards}>
        <Book
          title={props.books[0].title}
          image={props.books[0].image}
          author={props.books[0].author}
          year={props.books[0].year}
        />

        <Book
          title={props.books[1].title}
          image={props.books[1].image}
          author={props.books[1].author}
          year={props.books[1].year}
        />

        <Book
          title={props.books[2].title}
          image={props.books[2].image}
          author={props.books[2].author}
          year={props.books[2].year}
        />
      </div>
    </div>
  );
};

export default BookList;
