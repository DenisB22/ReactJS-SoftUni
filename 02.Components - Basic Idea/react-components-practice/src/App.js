import "./App.css";
import BookList from "./components/BookList";

function App() {
  const books = [
    {
      title: "Twelve Rules for Life",
      author: "Jordan B. Peterson",
      year: 2018,
      image:
        "https://cdn.ozone.bg/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/de9272fae42b1a9f91276b901984fb4b/12-rules-for-life--an-antidote-to-chaos-30.jpg",
    },
    {
      title: "Origin",
      author: "Dan Brown",
      year: 2017,
      image: "https://m.media-amazon.com/images/I/91ZeWa2jVaL.jpg",
    },
    {
      title: "1984",
      author: "George Orwell",
      year: 1948,
      image:
        "https://kbimages1-a.akamaihd.net/c9472126-7f96-402d-ba57-5ba4c0f4b238/1200/1200/False/nineteen-eighty-four-1984-george.jpg",
    },
  ];

  return (
    <div className="App">
      <h1>React Books Demo</h1>
      <BookList books={books} />
    </div>
  );
}

export default App;
